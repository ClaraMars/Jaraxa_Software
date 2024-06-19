import { useState, useEffect } from "react";
import { getDrugsResults } from "../../utils/Fetch";
import {
  BASE_FDA_API_ENDPOINTS,
  GradientCircularProgress,
} from "../../utils/Utils";
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "../Card/Card";
import Grid from "@mui/material/Unstable_Grid2";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export default function Results(props) {
  const data = props.results;
  const isOpenfdaNotEmpty = Object.keys(data.openfda || {}).length !== 0;
  const sortedData = [...data.data].sort((a, b) => {
    const nameA = isOpenfdaNotEmpty
      ? a.openfda?.brand_name[0]
      : a.products[0]?.brand_name;
    const nameB = isOpenfdaNotEmpty
      ? b.openfda?.brand_name[0]
      : b.products[0]?.brand_name;
    return nameA.localeCompare(nameB);
  });
  const [page, setPage] = useState(1);
  const [loadMoreResults, setLoadMoreResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMoreResults = async () => {
    const newPage = page + 1;
    setPage(newPage);
    const skip = props.query.limit * page;
    const url = `${BASE_FDA_API_ENDPOINTS.drugsFDA}?search=${props.query.term}&limit=${props.query.limit}&skip=${skip}`;
    await getDrugsResults(url, setLoadMoreResults, setIsLoading, setError);
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    await getMoreResults();
    if (loadMoreResults && loadMoreResults.data) {
      props.setResults((prevResults) => ({
        ...prevResults,
        data: [...prevResults.data, ...loadMoreResults.data],
      }));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getMoreResults();
  }, []);

  return (
    <>
      <Typography variant="h6" mb={3}>
        Resultados de la búsqueda
      </Typography>
      {data && (
        <>
          {data.totalResults !== 0 && (
            <Typography mb={3}>
              Total de resultados: {data.totalResults}
            </Typography>
          )}

          <Grid container spacing={2}>
            {props.isLoading ? (
              <GradientCircularProgress />
            ) : props.error ? (
              <Alert severity="error">No se encontraron resultados.</Alert>
            ) : (
              <Box>
                <Grid2 container spacing={2}>
                  {/* {sortedData.map((drug, index) => (
                    <Card key={index} results={drug} />
                  ))} */}
                  {data.data.map((drug, index) => (
                    <Card key={index} results={drug} />
                  ))}
                </Grid2>
                {isLoading && <GradientCircularProgress />}
                {props.loadMoreResults && props.loadMoreResults.data && (
                  <Grid2 container spacing={2}>
                    {props.loadMoreResults.data.map((drug, index) => (
                      <Card key={index} results={drug} />
                    ))}
                  </Grid2>
                )}
                {data.data.length < data.totalResults && (
                  <Box display="flex" justifyContent="center">
                    <Button
                      style={{ margin: "2rem 0 4rem" }}
                      variant="contained"
                      disabled={isLoading}
                      onClick={handleLoadMore}
                    >
                      Mostrar más resultados
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Grid>
        </>
      )}
    </>
  );
}
