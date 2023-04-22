import Movies from './components/Movies'
import useChange from './hooks/useChange'
import useMovies from './hooks/useMovies'

function App () {
  const { query, handleChange, error } = useChange()
  const { data, fetchMovie, loading } = useMovies()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (error) return
    fetchMovie(query)
  }

  return (
    <div className='app'>

      <form onSubmit={handleSubmit}>
        <input required onChange={handleChange} value={query} name='query' type='text' placeholder='Bladerunner 2049...' />
        <button>Buscar</button>
      </form>

      {loading ? <p>Cargando...</p> : <Movies data={data} />}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default App
