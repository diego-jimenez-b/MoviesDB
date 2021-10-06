import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { getAutocompleteUrl } from '../../api/api';
import MovieDetails from '../movie-details/MovieDetails';
import classes from './MainNavigation.module.css';

const MainNavigation = ({ onChangeType, displayType }) => {
  const [userInput, setUserInput] = useState('');
  const [autocomplete, setAutocomplete] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const inputChangeHandler = (event) => setUserInput(event.target.value);

  const selectMovieHandler = (event) => {
    let type = `/${displayType}/`;
    if (displayType === 'all') type = `/${event.target.dataset.type}/`;
    const id = event.target.dataset.id;
    setSelectedMovie({ id, type });
  };
  const closeDetailsHandler = () => setSelectedMovie(null);

  // const stopAutocomplete = () => {
  //   setTimeout(() => setAutocomplete([]), 500);
  // };

  useEffect(() => {
    let type = displayType;
    if (displayType === 'all') type = 'multi';

    const timer = setTimeout(() => {
      if (userInput.trim().length !== 0) {
        fetch(getAutocompleteUrl(type, userInput))
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            const autoObj = data.results.filter((result) => {
              return result.media_type !== 'person';
            });
            setAutocomplete(autoObj.slice(0, 7));
          });
      } else {
        setAutocomplete([]);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [userInput, displayType]);

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
          placeholder='Search by name'
          value={userInput}
          onChange={inputChangeHandler}
          // onBlur={stopAutocomplete}
        />

        {autocomplete.length > 0 && (
          <div className={classes['auto-box']}>
            {autocomplete.map((obj) => (
              <span
                key={`auto_${obj.id}`}
                data-id={obj.id}
                data-type={obj.media_type}
                onClick={selectMovieHandler}
              >
                {obj.title ? obj.title : obj.name}
              </span>
            ))}
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
