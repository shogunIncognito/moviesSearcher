export default async function getMovies (query) {
  try {
    const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=406f0ce1`)
    const { Search } = await res.json()
    return Search
  } catch (error) {
    throw new Error('Error al consultar peliculas')
  }
}
