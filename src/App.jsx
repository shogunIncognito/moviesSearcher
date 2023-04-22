import { useCallback, useState } from 'react'
import Movies from './components/Movies'
import useChange from './hooks/useChange'
import useMovies from './hooks/useMovies'
import debounce from 'just-debounce-it'

function App () {
  const [isSort, setIsSort] = useState(false)
  const { query, setQuery, error } = useChange()
  const { movies, fetchMovie, loading } = useMovies({ isSort })

  const debouncedFetch = useCallback(debounce(query => {
    fetchMovie(query)
  }, 300), [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (error) return
    fetchMovie(query)
  }

  const handleChange = (e) => {
    const newQuery = e.target.value
    if (newQuery.startsWith(' ')) return
    setQuery(newQuery)
    debouncedFetch(newQuery)
  }

  const handleSort = () => setIsSort(!isSort)

  return (
    <div className='app'>

      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
        <input required onChange={handleChange} value={query} name='query' type='text' placeholder='Bladerunner 2049...' />
        <div>
          <button>Buscar</button>
          <button disabled={!movies} style={{ backgroundColor: isSort && 'green' }} onClick={handleSort}>Ordenar</button>
        </div>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? <p>Cargando...</p> : <Movies data={movies} />}

    </div>
  )
}

export default App
