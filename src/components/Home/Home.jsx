import "./Home.css";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { BASE_FDA_API_ENDPOINTS } from "../../utils/Utils";
import { getDrugsResults } from "../../utils/Fetch";
import { Links } from "./Links";
import { Results } from "./Results";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";

const CustomTypographyH1 = styled(Typography)({
  fontSize: "4rem",
  margin: "0 0 2rem",
  fontWeight: "600",
});

const BlueTypographyH1 = styled("span")(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#55A6F6" : "#0959AA",
}));

const CustomTypographySubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#94A6b8" : "#4C5967",
  width: "80%",
}));

export default function Home() {
  const [query, setQuery] = useState({
    term: "",
    limit: 10,
    order: "asc",
  });
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // const FDA_API_ENDPOINTS = {
  //   drugsFDA: `${BASE_FDA_API_ENDPOINTS.drugsFDA}?search=${query.term}&limit=${query.limit}`,
  // };

  // const handleQuery = (e, setter, property) => {
  //   setter((prevState) => ({ ...prevState, [property]: e.target.value }));
  // };

  const handleSearch = async (e, searchTerm, limit) => {
    e.preventDefault();
    if (!searchTerm) {
      setError(true);
      return;
    }
    const searchUrl = `${BASE_FDA_API_ENDPOINTS.drugsFDA}?&search=${searchTerm}&limit=${limit}`;
    getDrugsResults(setResults, searchUrl);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      <Box className="c-home__box-titles">
        <CustomTypographyH1 variant="h1">
          FDA Drug
          <BlueTypographyH1> Search</BlueTypographyH1>
        </CustomTypographyH1>
        <CustomTypographySubtitle variant="subtitle1">
          Busca información detallada sobre los medicamentos aprobados por la
          FDA. Encuentra fácilmente nombres de marca, nombres genéricos y fechas
          de aprobación de medicamentos.
        </CustomTypographySubtitle>
      </Box>
      <Box className="c-home__box-search">
        <FormControl
          className="c-home__box-search-form"
          component="form"
          onSubmit={(e) => handleSearch(e, query.term, query.limit)}
        >
          <Box className="c-home__form-search--input">
            <TextField
              type="search"
              autoComplete="off"
              id="outlined-basic"
              label="Busca un medicamento"
              value={query.term}
              onChange={(e) =>
                setQuery((prevState) => ({
                  ...prevState,
                  term: e.target.value,
                }))
              }
              onInput={(e) => {
                setResults(null);
              }}
              variant="outlined"
              size="small"
              fullWidth
            />
            <Button type="submit" variant="contained">
              Buscar
            </Button>
          </Box>
        </FormControl>
        <Box className="c-home__box-search-filter">Filtro</Box>
      </Box>
      {error && (
        <Box mt={1} mb={1}>
          <Alert severity="error">Introduce una búsqueda</Alert>
        </Box>
      )}
      {results && results.data ? (
        <Results query={query} results={results} setResults={setResults} />
      ) : (
        <Links
          // setQuery={setQuery}
          // handleQuery={handleQuery}
          handleSearch={(e) => handleSearch(e, query.term, query.limit)}
        />
      )}

      <div>
        {/* <div className="c-home__grid-header-wrapper">
          <h4>Resultados de la búsqueda</h4>
          <div>
            <FormControl size="small" sx={{ mr: 2, width: 150 }}>
              <InputLabel id="limit-select-label">
                Mostrar por página
              </InputLabel>
              <Select
                labelId="limit-select-label"
                id="limit-select"
                value={query.limit}
                label="limit"
                onChange={(e) => handleQuery(e, setQuery, "limit")}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small">
              <InputLabel id="select-label">Ordenar</InputLabel>
              <Select
                labelId="select-label"
                id="order-select"
                value={query.order}
                label="Order"
                onChange={(e) => handleQuery(e, setQuery, "order")}
              >
                <MenuItem value="asc">Ascendente</MenuItem>
                <MenuItem value="desc">Descendente</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div> */}
      </div>
    </>
  );
}
