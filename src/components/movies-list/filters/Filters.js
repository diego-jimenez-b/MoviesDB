import { Fragment, useState } from 'react';
import arrowIcon from '../../../assets/icons/down-arrow.svg';
import classes from './Filters.module.css';

const Filters = ({ genres, selectedGenreId, onSearchGender }) => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFiltersHandler = () => setShowFilters((prevState) => !prevState);

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
              onClick={onSearchGender.bind(null, genre.id)}
            >
              {genre.name}
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default Filters;
