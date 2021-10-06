import { useCallback, useState } from 'react';
import MovieDetails from '../movie-details/MovieDetails';
import Movie from './Movie';
import classes from './MoviesList.module.css';

const MoviesList = ({ moviesList, onFetchByGenre, displayType }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const showMovieDetails = useCallback((id, type) => {
    setSelectedMovie({ id, type: type ? type : displayType  });
  }, [displayType]);
  const closeDetailsHandler = () => setSelectedMovie(null);

  const searchGenderHandler = (event) => {
    const id = event.target.dataset.genre;
    onFetchByGenre(id);
  };

  return (
    <section className={classes.section}>
      {displayType !== 'all' && (
        <ul className={classes.filters}>
          <li data-genre='28' onClick={searchGenderHandler}>
            Action
          </li>
          <li data-genre='35' onClick={searchGenderHandler}>
            Comedy
          </li>
        </ul>
      )}

      <h2>Trending this week</h2>

      <ul className={classes.list}>
        {moviesList.map((movie) => (
          <Movie key={movie.id} data={movie} onShowDetails={showMovieDetails} />
        ))}
      </ul>

      {selectedMovie && (
        <MovieDetails
          id={selectedMovie.id}
          type={selectedMovie.type}
          onClose={closeDetailsHandler}
        />
      )}
    </section>
  );
};

export default MoviesList;
