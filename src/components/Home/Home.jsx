import "./Home.css";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DrugCard from "../DrugCard/DrugCard";
import Grid from "@mui/material/Unstable_Grid2";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { GradientCircularProgress } from "../../utils/Utils";
import { Typography } from "@mui/material";
import { getBasicResults, getAllDrugEndpoints } from "../../utils/Fetch";

export default function Home() {
  const [query, setQuery] = useState({
    term: "",
    limit: 10,
    order: "asc",
  });
  const [results, setResults] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);

  const [resultsEvents, setResultsEvents] = useState(null);
  const [resultsLabels, setResultsLabels] = useState(null);
  const [resultsEnforcements, setResultsEnforcements] = useState(null);

  const FDA_API_ENDPOINTS = {
    event: `https://api.fda.gov/drug/event.json?search=${query.term}&limit=${query.limit}&sort=effective_time:${query.order}`,
    label: `https://api.fda.gov/drug/label.json?search=${query.term}&limit=${query.limit}&sort=effective_time:${query.order}`,
    enforcement: `https://api.fda.gov/drug/enforcement.json?search=${query.term}&limit=${query.limit}&sort=effective_time:${query.order}`,
  };
  const url = `https://api.fda.gov/drug/label.json?search=${query.term}&limit=${query.limit}&sort=effective_time:${query.order}`;

  const handleQuery = (e, setter, property) => {
    setter((prevState) => ({ ...prevState, [property]: e.target.value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    // getBasicResults(setResults, url);
    getAllDrugEndpoints(
      FDA_API_ENDPOINTS,
      setResults,
      setResultsEvents,
      setResultsLabels,
      setResultsEnforcements
    );
    // getResults();
  };
  console.log(resultsLabels);

  // const getResults = async () => {
  //   Object.values(results.data).filter((result) => {
  //     setSelectedResult(result !== undefined);
  //   });
  // };
  // useEffect(() => {
  //   getBasicResults(setResults, url);
  // }, [query.order, query.limit]);

  return (
    <>
      <form className="c-home__search" onSubmit={handleSearch}>
        <TextField
          type="search"
          autoComplete="off"
          id="outlined-basic"
          label="Busca un medicamento"
          value={query.term}
          onChange={(e) => handleQuery(e, setQuery, "term")}
          variant="outlined"
          size="small"
          fullWidth
        />
        <Button type="submit" variant="contained" onClick={handleSearch}>
          Buscar
        </Button>
      </form>
      {/* {results.totalResults !== 0 && (
        <Typography sx={{ margin: "1rem 0" }}>
          Total de resultados: {results.totalResults}
        </Typography>
      )} */}
      <div>
        <div className="c-home__grid-header-wrapper">
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
        </div>
        {/* <Grid container spacing={2}>
          {results.isLoading ? (
            <GradientCircularProgress />
          ) : results.error ? (
            <Alert severity="error">{results.error}</Alert>
          ) : (
            results.data.map((result) => (
              <Grid>
                <DrugCard
                // key={result.id}
                // title={
                //   result.openfda && result.openfda.brand_name
                //     ? result.openfda.brand_name[0]
                //     : "No brand name"
                // }
                />
              </Grid>
            ))
          )}
        </Grid> */}
      </div>
    </>
  );
}
