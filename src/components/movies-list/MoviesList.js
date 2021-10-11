import { useCallback, useState } from 'react';
import MovieDetails from '../movie-details/MovieDetails';
import Movie from './Movie';
import classes from './MoviesList.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';
import Filters from './filters/Filters';

const MoviesList = ({
  moviesList,
  onFetchMore,
  displayType,
  isFetching,
  loading,
  error,
  genreId,
  onSelectGenre,
}) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const showDetailsHandler = useCallback(
    (id, type) => {
      setSelectedMovie({ id, type: type ? type : displayType });
    },
    [displayType]
  );
  const closeDetailsHandler = () => setSelectedMovie(null);

  const searchGenderHandler = useCallback((id) => {
    onSelectGenre(id);
  }, [onSelectGenre]);

  return (
    <section className={classes.section}>
      {displayType !== 'all' && (
        <Filters
          onSearchGenre={searchGenderHandler}
          selectedGenreId={genreId}
          displayType={displayType}
        />
      )}

      <h2>Trending this week</h2>

      {loading && isFetching && <LoadingSpinner />}
      {!isFetching && error && (
        <p className={classes.msg}>
          Something went wrong, please try again in a few moments
        </p>
      )}
      {!loading && !error && (
        <ul className={classes.list}>
          {moviesList.map((movie) => (
            <Movie
              key={movie.id}
              data={movie}
              onShowDetails={showDetailsHandler}
            />
          ))}
        </ul>
      )}

      {!loading && isFetching && <LoadingSpinner />}
      {!isFetching && displayType !== 'all' && (
        <button className={classes['load-btn']} onClick={onFetchMore}>
          Load more movies
        </button>
      )}

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
