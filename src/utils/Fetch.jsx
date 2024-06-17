export async function getDrugsResults(setResults, url) {
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
      data: data.results,
      totalResults: data.meta.results.total,
      isLoading: false,
    });
  } catch (error) {
    setResults({ error: error.message, isLoading: false });
  }
}
