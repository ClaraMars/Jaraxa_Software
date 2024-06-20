import "./Home.css";
import { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  BASE_FDA_API_ENDPOINTS,
  GradientCircularProgress,
} from "../../utils/Utils";
import { getDrugsResults } from "../../utils/Fetch";
import Links from "./Links";
import Results from "./Results";

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
    skip: 0,
    filter: "",
  });
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addFilter, setAddFilter] = useState(false);
  const [searchTermFilter, setSearchTermFilter] = useState("");
  const [changeLimit, setChangeLimit] = useState(10);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async (e, searchTerm, limit) => {
    e.preventDefault();
    if (!searchTerm) {
      setError(true);
      return;
    }

    const trimmedSearchTerm = searchTerm
      .trim()
      .split(" ")
      .map((term) => `*${term}*`);

    const hasFilter = searchTermFilter
      ? `${searchTermFilter}:(${trimmedSearchTerm.join("+AND+")})`
      : `(${trimmedSearchTerm.join("+AND+")})`;

    setQuery((prevState) => ({
      ...prevState,
      limit: changeLimit,
      filter: hasFilter,
    }));
    console.log(query);
    const searchUrl = `${BASE_FDA_API_ENDPOINTS.drugsFDA}?&search=${hasFilter}&limit=${changeLimit}&skip=${query.skip}`;
    await getDrugsResults(searchUrl, setResults, setIsLoading, setError);
    setSearchPerformed(true);
  };

  const handleAddFilter = () => {
    setAddFilter(true);
  };

  const handleChangeFilter = (e) => {
    setSearchTermFilter(e.target.value);
  };

  const handleChangeLimit = (e) => {
    setChangeLimit(e.target.value);
    setQuery((prevState) => ({ ...prevState, limit: e.target.value }));
  };

  const handleLinkSearch = (e) => {
    e.preventDefault();
    setQuery((prevState) => ({ ...prevState, term: e.target.innerText }));
    handleSearch(e, e.target.innerText, query.limit);
  };

  const handleResetSearch = () => {
    setQuery({ term: "", limit: 10, skip: 0, filter: "" });
    setResults(null);
    setSearchPerformed(false);
    setAddFilter(false);
    setSearchTermFilter("");
    setChangeLimit(10);
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
    <Box p="0 5rem">
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
          <Box className="c-home__input-wrapper">
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
            <Box className="c-home__buttons-wrapper">
              <Button
                className="c-home__button"
                type="submit"
                variant="contained"
              >
                Buscar
              </Button>
              <Button
                className="c-home__button"
                variant="contained"
                onClick={handleResetSearch}
              >
                Resetear
              </Button>
            </Box>
          </Box>
        </FormControl>
        <Box className="c-home__filter-wrapper">
          <Chip
            disabled={addFilter || searchPerformed}
            label="+ Añadir filtros"
            color="primary"
            variant="outlined"
            onClick={handleAddFilter}
          />
          <Box className="c-home__filter-select" gap={3}>
            {addFilter && (
              <>
                <FormControl sx={{ minWidth: 200 }} size="small">
                  <InputLabel id="search-fields-label">
                    Campo de búsqueda
                  </InputLabel>
                  <Select
                    labelId="search-fields-label"
                    id="search-fields"
                    value={searchTermFilter}
                    label="Campo de búsqueda"
                    onChange={handleChangeFilter}
                    disabled={searchPerformed}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"application_number"}>
                      Número de aplicación
                    </MenuItem>
                    <MenuItem value={"openfda.manufacturer_name"}>
                      Fabricante
                    </MenuItem>
                    <MenuItem value={"sponsor_name"}>Patrocinador</MenuItem>
                    <MenuItem value={"openfda.brand_name"}>
                      Nombre de marca
                    </MenuItem>
                    <MenuItem value={"openfda.generic_name"}>
                      Nombre genérico
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 120 }} size="small">
                  <InputLabel id="change-limit-label">Por página</InputLabel>
                  <Select
                    labelId="change-limit-label"
                    id="change-limit"
                    value={changeLimit}
                    label="Por página"
                    onChange={handleChangeLimit}
                    disabled={searchPerformed}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Box mt={6} pb={10}>
        {isLoading ? (
          <GradientCircularProgress />
        ) : error ? (
          <Box mt={1} mb={1}>
            <Alert severity="error">
              {query.term === ""
                ? "Introduce una búsqueda"
                : "No hemos encontrado resultados"}
            </Alert>
          </Box>
        ) : results && results.data ? (
          <Results
            query={query}
            results={results}
            setResults={setResults}
            isLoading={isLoading}
            error={error}
          />
        ) : (
          <Links handleLinkSearch={handleLinkSearch} />
        )}
      </Box>
    </Box>
  );
}
