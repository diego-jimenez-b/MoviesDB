import classes from './MainNavigation.module.css';
import SearchInput from './search-input/SearchInput';

const MainNavigation = ({ onChangeType, displayType }) => {
  let mediaType = 'movie';
  if (displayType === 'all') mediaType = '';
  if (displayType === 'tv') mediaType = 'series';
  const inputPlaceholder = `Search ${mediaType} by name`;

  return (
    <header className={classes['top-bar']}>
      <div>
        <h1>MoviesDB</h1>
      </div>

      <nav className={classes.nav}>
        <ul>
          <li
            className={displayType === 'movie' ? classes.underline : ''}
            onClick={onChangeType.bind(null, 'movie')}
          >
            Movies
          </li>
          <li
            className={displayType === 'tv' ? classes.underline : ''}
            onClick={onChangeType.bind(null, 'tv')}
          >
            Series
          </li>
          <li
            className={displayType === 'all' ? classes.underline : ''}
            onClick={onChangeType.bind(null, 'all')}
          >
            All
          </li>
        </ul>

        <SearchInput
          placeholderText={inputPlaceholder}
          displayType={displayType}
        />
      </nav>
    </header>
  );
};

export default MainNavigation;
