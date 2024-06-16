export async function getBasicResults(setResults, url) {
  try {
    setResults({ isLoading: true });
    const response = await fetch(url);
    console.log(response);
    if (response.status === 400)
      throw new Error(
        "Lo sentimos, en este momento no se pudo completar la petición."
      );
    if (response.status === 404)
      throw new Error("No se encontraron resultados.");

    const data = await response.json();
    console.log(data);
    setResults({
      isLoading: false,
      data: data.results,
      totalResults: data.meta.results.total,
    });
  } catch (error) {
    setResults({ error: error.message });
  }
}

export async function getAllDrugEndpoints(
  FDA_API_ENDPOINTS,
  setResults,
  setResultsEvents,
  setResultsLabels,
  setResultsEnforcements
) {
  try {
    const response = Object.values(FDA_API_ENDPOINTS).map(async (endpoint) => {
      const response = await fetch(endpoint);
      if (!response.ok && response.status !== 404) return;
      if (response.status === 404)
        throw new Error("No se encontraron resultados");
      return response.json();
    });

    console.log(response);
    const data = await Promise.all(response);
    console.log(data);
    setResults({
      isLoading: false,
      data: {
        events: data[0],
        labels: data[1],
        enforcements: data[2],
      },
    });
    setResultsEvents(data[0]);
    setResultsLabels(data[1]);
    setResultsEnforcements(data[2]);
  } catch (error) {
    console.error(error);
    setResults({ error: error.message });
  }
}
