import { Fragment, memo, useState } from 'react';
import arrowIcon from '../../../assets/icons/down-arrow.svg';
import classes from './Filters.module.css';

const genresArr = [
  { id: 'any', name: 'All' },
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

const Filters = ({ selectedGenreId, onSearchGenre, displayType }) => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFiltersHandler = () => setShowFilters((prevState) => !prevState);

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
    <Fragment>
      <div className={classes['show-genres']} onClick={toggleFiltersHandler}>
        <img
          src={arrowIcon}
          alt='arrow-icon'
          className={showFilters ? classes.rotate : ''}
        />
        <span>Search by genre</span>
      </div>

      {showFilters && (
        <ul className={classes.filters}>
          {genres.map((genre) => (
            <li
              className={selectedGenreId === genre.id ? classes.selected : ''}
              key={genre.id}
              onClick={onSearchGenre.bind(null, genre.id)}
            >
              {genre.name}
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default memo(Filters);
