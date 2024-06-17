import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DrugCard from "../DrugCard/DrugCard";
import Grid from "@mui/material/Unstable_Grid2";
import { getDrugsResults } from "../../utils/Fetch";
import {
  BASE_FDA_API_ENDPOINTS,
  GradientCircularProgress,
} from "../../utils/Utils";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export function Results(props) {
  const [page, setPage] = useState(1);
  const [loadMoreResults, setLoadMoreResults] = useState([]);
  const skip = props.query.limit * page;
  const url = `${BASE_FDA_API_ENDPOINTS.drugsFDA}?search=${props.query.term}&limit=${props.query.limit}&skip=${skip}`;

  const getMoreResults = async () => {
    setPage(page + 1);
    const results = await getDrugsResults(setLoadMoreResults, url);
    return results;
  };

  const loadMore = async () => {
    const newResults = await getMoreResults();
    props.setResults((prevResults) => [
      ...prevResults.data,
      ...loadMoreResults.data,
    ]);
  };

  useEffect(() => {}, []);

  console.log(url, props.results, loadMoreResults);
  return (
    <>
      <Typography variant="h6">Resultados de la búsqueda</Typography>
      {props.results && (
        <>
          {props.results.totalResults !== 0 && (
            <Typography sx={{ margin: "1rem 0" }}>
              Total de resultados: {props.results.totalResults}
            </Typography>
          )}

          <Grid container spacing={2}>
            {props.results.isLoading ? (
              <GradientCircularProgress />
            ) : props.results.error ? (
              <Alert severity="error">"No se encontraron resultados."</Alert>
            ) : (
              <Box>
                <Grid2 container spacing={2}>
                  {props.results.data.map((drug, index) => (
                    <DrugCard key={index} results={drug} />
                  ))}
                </Grid2>
                {/* {results.map((drug, index) => (
                  <DrugCard key={index} results={drug} />
                ))} */}
                {props.results.data.length < props.results.totalResults && (
                  <Button variant="contained" onClick={loadMore}>
                    Mostrar más
                  </Button>
                )}
              </Box>
            )}
          </Grid>
        </>
      )}
    </>
  );
}
