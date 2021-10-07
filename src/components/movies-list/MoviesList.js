import { useCallback, useState, useEffect } from 'react';
import MovieDetails from '../movie-details/MovieDetails';
import Movie from './Movie';
import classes from './MoviesList.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';
import Filters from './filters/Filters';

const genresArr = [
  { id: 0, name: 'All' },
  { id: '28', name: 'Action' },
  { id: '35', name: 'Comedy' },
  { id: '27', name: 'Horror' },
  { id: '10749', name: 'Romance' },
  { id: '9648', name: 'Mystery' },
  { id: '878', name: 'Science Fiction' },
  { id: '53', name: 'Thriller' },
  { id: '18', name: 'Drama' },
  { id: '99', name: 'Documentary' },
  { id: '16', name: 'Animation' },
];

let isInitial = true;

const MoviesList = ({
  moviesList,
  onFetchByGenre,
  displayType,
  isLoading,
  error,
}) => {
  const [currentFetchingPage, setCurrentFetchingPage] = useState(1);

  const [selectedGenreId, setSelectedGenreId] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const showMovieDetails = useCallback(
    (id, type) => {
      setSelectedMovie({ id, type: type ? type : displayType });
    },
    [displayType]
  );

  const closeDetailsHandler = () => setSelectedMovie(null);

  const searchGenderHandler = (id) => {
    setSelectedGenreId(id);
    onFetchByGenre(id === 0 ? null : id);
  };

  const fetchMoreMovies = () => {
    setCurrentFetchingPage((prevState) => prevState + 1);
    onFetchByGenre(selectedGenreId, currentFetchingPage + 1);
  };

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    setCurrentFetchingPage(1);
  }, [displayType, selectedGenreId]);

  useEffect(() => setSelectedGenreId(0), [displayType]);

  let genres = genresArr;
  if (displayType === 'tv') {
    genres = genres.filter((genre) => {
      return (
        genre.id !== '27' &&
        genre.name !== 'Science Fiction' &&
        genre.name !== 'Action'
      );
    });
  }

  return (
    <section className={classes.section}>
      <Filters
        genres={genres}
        onSearchGender={searchGenderHandler}
        selectedGenreId={selectedGenreId}
      />

      <h2>Trending this week</h2>

      {isLoading && moviesList.length === 0 && <LoadingSpinner />}
      {error && (
        <p className={classes.msg}>
          Something went wrong, please try again in a few moments
        </p>
      )}
      {moviesList.length > 0 && !error && (
        <ul className={classes.list}>
          {moviesList.map((movie) => (
            <Movie
              key={movie.id}
              data={movie}
              onShowDetails={showMovieDetails}
            />
          ))}
        </ul>
      )}

      {isLoading && moviesList.length > 0 && <LoadingSpinner />}
      {displayType !== 'all' && selectedGenreId !== 0 && (
        <button className={classes['load-btn']} onClick={fetchMoreMovies}>
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
