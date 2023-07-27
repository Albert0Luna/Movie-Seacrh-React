import React, { useCallback, useEffect, useRef, useState } from 'react'
import './src/styles/App.css'
import { Movies } from './src/components/movies'
import { useMovies } from './src/Hooks/useMovies.js'
import debounce from 'just-debounce-it'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current === true) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con un numero')
      return
    }

    if (search.length < 3) {
      setError('la busqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

export default function App () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, noMovies, getMovies } = useMovies({ search, sort })

  const debounceGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 200), [getMovies])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debounceGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
          <h1 style={{ textAlign: 'center' }}>CINE 🐙 Pulpocto</h1>
      <header>
        <h1>Code Search</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name="query" type="text" placeholder='Raven, Sars, The Mat...'/>
          <input type="checkbox" onChange={handleSort} checked={sort}/>
          <button type='submit'>Search</button>
        </form>
        {error && <p style={{ color: 'crimson', fontWeight: 'bold' }}>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Cargando...</p> : null
        }
      <Movies movies={movies} noRes={noMovies}/>
      </main>
    </div>

  )
}
