import { Fragment, useCallback } from 'react';
import { useEffect, useState } from 'react';
import MainNavigation from './components/main-navigation/MainNavigation';
import MoviesList from './components/Movies/MoviesList';
import mainBackground from './assets/images/main-background.jpg';
import { getMediaUrlByGenre, getTrendingUrl } from './api/api';

// const popular = '/discover/movie?sort_by=popularity.desc&'

function App() {
  const [movies, setMovies] = useState([]);
  const [type, setType] = useState('movie');

  const fetchMoviesHandler = useCallback(
    (genreId) => {
      let url;
      if (genreId) {
        url = getMediaUrlByGenre(type, genreId);
      } else url = getTrendingUrl(type);

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.results);
        });
    },
    [type]
  );

  useEffect(() => {
    fetchMoviesHandler();
  }, [type, fetchMoviesHandler]);

  console.log(movies[0]);

  // useEffect(() => {
  //   fetch(
  //     'https://api.themoviedb.org/3/discover/movie?api_key=282f63039879e23307f585741fbb6e92&with_genres=28'
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, []);

  /* <img src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}/> */

  return (
    <Fragment>
      <img src={mainBackground} className='background' alt='background' />

      <div className='container'>
        <MainNavigation onChangeType={setType} displayType={type} />
        <MoviesList
          moviesList={movies}
          onFetchByGenre={fetchMoviesHandler}
          displayType={type}
        />
      </div>
    </Fragment>
  );
}

export default App;
