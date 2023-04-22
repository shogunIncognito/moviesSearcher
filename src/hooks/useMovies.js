import { useRef, useState } from 'react'
import getMovies from '../services/getMovies'

export default function useMovies () {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const previousQuery = useRef(null)

  const fetchMovie = async (query) => {
    if (query === previousQuery.current) return
    try {
      setLoading(true)
      const data = await getMovies(query)
      previousQuery.current = query
      if (data?.length === 0) throw new Error('No se encontraron peliculas')
      setData(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    fetchMovie,
    loading
  }
}
