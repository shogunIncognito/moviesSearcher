import { useCallback, useMemo, useRef, useState } from 'react'
import getMovies from '../services/getMovies'

export default function useMovies ({ isSort }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const previousQuery = useRef(null)

  const fetchMovie = useCallback(async (query) => {
    if (query === previousQuery.current) return
    try {
      setLoading(true)

      const res = await getMovies(query)
      previousQuery.current = query

      if (res?.length === 0) throw new Error('No se encontraron peliculas')
      setData(res)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [])

  const movies = useMemo(() => {
    return isSort && data ? [...data].sort((a, b) => a.Title.localeCompare(b.title)) : data
  }, [data, isSort])

  return {
    movies,
    fetchMovie,
    loading
  }
}
