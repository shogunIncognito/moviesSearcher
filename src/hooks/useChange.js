import { useState, useEffect, useRef } from 'react'

export default function useChange () {
  const isFirstRender = useRef(true)
  const [query, setQuery] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = query === ''
      return
    }

    if (query === '') {
      setError('No se puede buscar vacío')
      return
    }

    if (query.length < 3) {
      setError('No se puede buscar con menos de 3 caracteres')
      return
    }

    setError(false)
  }, [query])

  const handleChange = (e) => {
    const newQuery = e.target.value
    if (newQuery.startsWith(' ')) return
    setQuery(e.target.value)
  }

  return {
    query,
    handleChange,
    error
  }
}
