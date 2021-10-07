import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { getAutocompleteUrl } from '../../api/api';
import useHttp from '../../hooks/useHttp';
import MovieDetails from '../movie-details/MovieDetails';
import classes from './MainNavigation.module.css';

let isInitial = true;

const MainNavigation = ({ onChangeType, displayType }) => {
  const { fetchData, isLoading, setIsLoading } = useHttp();
  const [userInput, setUserInput] = useState('');
  const [autocomplete, setAutocomplete] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const inputChangeHandler = (event) => setUserInput(event.target.value);

  const selectMovieHandler = (event) => {
    if (event.target.dataset.id === 'none') return;

    let type = displayType;
    if (displayType === 'all') type = event.target.dataset.type;
    const id = event.target.dataset.id;
    setSelectedMovie({ id, type });
  };

  const closeDetailsHandler = () => setSelectedMovie(null);

  useEffect(() => {
    let type = displayType;
    if (displayType === 'all') type = 'multi';

    const timer = setTimeout(() => {
      if (userInput.trim().length !== 0) {
        const url = getAutocompleteUrl(type, userInput);

        fetchData(url, (data) => {
          if (data.results.length === 0) {
            setAutocomplete([{ id: 'none', name: 'No match found' }]);
          } else {
            const autoObj = data.results.filter((result) => {
              return result.media_type !== 'person';
            });
            setAutocomplete(autoObj.slice(0, 7));
          }
        });
      } else {
        setAutocomplete([]);
        setIsLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [userInput, displayType, fetchData, setIsLoading]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (userInput.trim().length !== 0) setIsLoading(true);
    else setIsLoading(false);
  }, [userInput, setIsLoading]);

  let mediaType = 'movie';
  if (displayType === 'all') mediaType = '';
  if (displayType === 'tv') mediaType = 'series';
  const inputPlaceholder = `Search ${mediaType} by name`;

  return (
    <header className={classes['top-bar']}>
      <div>
        <h1>MoviesDB</h1>
      </div>

      <div className={classes.nav}>
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

        <input
          type='text'
          placeholder={inputPlaceholder}
          value={userInput}
          onChange={inputChangeHandler}
          // onBlur={stopAutocomplete}
        />

        {userInput.trim() !== '' && (
          <div className={classes['auto-box']}>
            {!isLoading &&
              autocomplete.map((obj) => (
                <span
                  key={`auto_${obj.id}`}
                  data-id={obj.id}
                  data-type={obj.media_type}
                  onClick={selectMovieHandler}
                >
                  {obj.title ? obj.title : obj.name}
                </span>
              ))}
            {isLoading && <span>Searching...</span>}
          </div>
        )}
      </div>

      {selectedMovie && (
        <MovieDetails
          id={selectedMovie.id}
          type={selectedMovie.type}
          onClose={closeDetailsHandler}
        />
      )}
    </header>
  );
};

export default MainNavigation;
