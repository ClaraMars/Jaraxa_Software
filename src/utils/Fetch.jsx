export async function getDrugsResults(url, setResults, setIsLoading, setError) {
  console.log("url fetch", url);
  try {
    setIsLoading(true);
    const response = await fetch(url);
    console.log(response);
    // if (response.status === 400)
    //   throw new Error(
    //     "Lo sentimos, en este momento no se pudo completar la petición."
    //   );
    // if (response.status === 404)
    //   throw new Error("No se encontraron resultados.");

    if (!response.ok) throw new Error("Error en la petición.");
    const data = await response.json();
    console.log(data);
    setResults({
      data: data.results,
      totalResults: data.meta.results.total,
    });
  } catch (error) {
    setError(true);
  } finally {
    setIsLoading(false);
  }
}
