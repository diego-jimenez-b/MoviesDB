import { useCallback, useState } from 'react';
import MovieDetails from '../movie-details/MovieDetails';
import Movie from './Movie';
import arrowIcon from '../../assets/icons/down-arrow.svg';
import classes from './MoviesList.module.css';

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

const MoviesList = ({ moviesList, onFetchByGenre, displayType }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const showMovieDetails = useCallback(
    (id, type) => {
      setSelectedMovie({ id, type: type ? type : displayType });
    },
    [displayType]
  );

  const closeDetailsHandler = () => setSelectedMovie(null);
  const toggleFiltersHandler = () => setShowFilters((prevState) => !prevState);

  const searchGenderHandler = (id) => {
    setSelectedGenre(id);
    onFetchByGenre(id === 0 ? null : id);
  };

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
      {displayType !== 'all' && (
        <div className={classes['show-genres']} onClick={toggleFiltersHandler}>
          <img
            src={arrowIcon}
            alt='arrow-icon'
            className={showFilters ? classes.rotate : ''}
          />
          <span>Search by genre</span>
        </div>
      )}
      {displayType !== 'all' && showFilters && (
        <ul className={classes.filters}>
          {genres.map((genre) => (
            <li
              className={selectedGenre === genre.id ? classes.selected : ''}
              key={genre.id}
              onClick={searchGenderHandler.bind(null, genre.id)}
            >
              {genre.name}
            </li>
          ))}
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
