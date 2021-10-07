import { Fragment, useCallback } from 'react';
import { useEffect, useState } from 'react';
import MainNavigation from './components/main-navigation/MainNavigation';
import MoviesList from './components/Movies/MoviesList';
import mainBackground from './assets/images/main-background.jpg';
import { getMediaUrlByGenre, getTrendingUrl } from './api/api';
import useHttp from './hooks/useHttp';

// const popular = '/discover/movie?sort_by=popularity.desc&'

function App() {
  const { fetchData, isLoading, error } = useHttp();
  const [movies, setMovies] = useState([]);
  const [type, setType] = useState('movie');

  const fetchMoviesHandler = useCallback(
    (genreId, pageNum) => {
      let url;
      if (genreId) {
        url = getMediaUrlByGenre(type, genreId, pageNum);
      } else url = getTrendingUrl(type);

      fetchData(url, (data) => {
        if (pageNum) {
          setMovies((prevState) => [...prevState, ...data.results]);
        } else setMovies(data.results);
      });

      // fetch(url)
      //   .then((response) => response.json())
      //   .then((data) => {
      //     if (pageNum) {
      //       setMovies((prevState) => [...prevState, ...data.results]);
      //     } else setMovies(data.results);
      //   });
    },
    [type, fetchData]
  );

  useEffect(() => {
    fetchMoviesHandler();
  }, [type, fetchMoviesHandler]);

  return (
    <Fragment>
      <img src={mainBackground} className='background' alt='background' />

      <div className='container'>
        <MainNavigation onChangeType={setType} displayType={type} />
        <MoviesList
          moviesList={movies}
          isLoading={isLoading}
          error={error}
          onFetchByGenre={fetchMoviesHandler}
          displayType={type}
        />
      </div>
    </Fragment>
  );
}

export default App;
