/* eslint-disable react/prop-types */
/* eslint-disable no-tabs */
import React from 'react'

export function Movies ({ movies, noRes }) {
  const hasMovies = movies?.length > 0
  return (
    hasMovies
      ? <ListOfMovies movies={movies}/>
      : <NoMovieResult noResults={noRes}/>
  )
}

function ListOfMovies ({ movies }) {
  return (
    <ul className='movies'>
      {
        movies.map(movie => (
          <li key={movie.id} className='movie'>
            <h3 className='movie-title'>{movie.title}</h3>
            <p className='movie-year'>{movie.year}</p>
            <img src={movie.poster} className='movie-img' alt={movie.Title} />
          </li>
        ))
      }
    </ul>
  )
}

function NoMovieResult ({ noResults }) {
  return (
		<p>{noResults.noMovie}</p>
  )
}
