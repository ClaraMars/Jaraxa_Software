import "./Home.css";
import { useState, useEffect } from "react";
import {
  BASE_FDA_API_ENDPOINTS,
  GradientCircularProgress,
} from "../../utils/Utils";
import { getDrugsResults } from "../../utils/Fetch";
import Links from "./Links";
import Results from "./Results";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

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
    skip: 0,
  });
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addFilter, setAddFilter] = useState(false);
  const [searchTermFilter, setSearchTermFilter] = useState("");
  const [changeLimit, setChangeLimit] = useState(false);

  //

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

    const trimmedSearchTerm = searchTerm.trim();
    console.log(trimmedSearchTerm);
    if (trimmedSearchTerm.includes(" ")) {
      console.log("contains space");
    }

    const hasFilter = searchTermFilter
      ? `${searchTermFilter}:${trimmedSearchTerm}`
      : `${trimmedSearchTerm}`;
    const searchUrl = `${BASE_FDA_API_ENDPOINTS.drugsFDA}?&search=${hasFilter}&limit=${limit}&skip=${query.skip}`;
    console.log(searchUrl);
    await getDrugsResults(searchUrl, setResults, setIsLoading, setError);
  };

  const handleAddFilter = () => {
    setAddFilter(true);
  };

  const handleChangeFilter = (e) => {
    setSearchTermFilter(e.target.value);
  };

  const handleChangeLimit = (e) => {
    setQuery((prevState) => ({ ...prevState, limit: e.target.value }));
    setChangeLimit(true);
  };

  const handleLinkSearch = (e) => {
    e.preventDefault();
    setQuery((prevState) => ({ ...prevState, term: e.target.innerText }));
    handleSearch(e, e.target.innerText, query.limit);
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
        <Box className="c-home__box-search-filter">
          <Box display={"flex"} gap={3}>
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
                    value={searchTermFilter}
                    label="Por página"
                    onChange={handleChangeLimit}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={"all"}>Todos</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}
          </Box>
          <Chip
            disabled={addFilter}
            label="+ Añadir filtros"
            color="primary"
            variant="outlined"
            onClick={handleAddFilter}
          />
        </Box>
      </Box>
      <Box pt={2} pb={10}>
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
