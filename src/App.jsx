import { useState, useEffect, useRef } from 'react'

function App() {
  const [data, setData] = useState([])
  const inputRef = useRef()

  const fetchMovie = (e) => {
    e.preventDefault()
    const inputEl = inputRef.current.value
    fetch(`https://www.omdbapi.com/?s=${inputEl}&apikey=406f0ce1`)
      .then(res => res.json())
      .then((json) => setData(json.Search))  
  }

  return (
    <div className="app">
      <form onSubmit={fetchMovie}>
        <input onChange={fetchMovie} ref={inputRef} type="text" placeholder='Bladerunner 2049...' />
        <button>Buscar</button>
      </form>
      <div className='movies'>
        {
          !data || data.length === 0 ?
            <p>Nada...</p>
            :            
            data.map(el => (
              <div key={el.imdbID}>
                <h4>{el.Title}</h4>
                <p>{el.Year}</p>
              <img style={{ height: '80%' }} src={el.Poster} alt={el.Title} />
            </div>
            ))            
        }
      </div>
    </div>
  )
}

export default App
