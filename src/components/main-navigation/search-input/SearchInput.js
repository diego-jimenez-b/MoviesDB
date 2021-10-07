import { Fragment, useEffect, useState } from 'react';
import { getAutocompleteUrl } from '../../../api/api';
import useHttp from '../../../hooks/useHttp';
import MovieDetails from '../../movie-details/MovieDetails';
import classes from './SearchInput.module.css';

const SearchInput = ({ displayType, placeholderText }) => {
  const { fetchData, isLoading, setIsLoading } = useHttp();

  const [userInput, setUserInput] = useState('');
  const [autocomplete, setAutocomplete] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const inputChangeHandler = (event) => setUserInput(event.target.value);

  const selectMovieHandler = (id, type) => {
    if (id === 'none') return;

    let typeVal = displayType;
    if (displayType === 'all') typeVal = type;

    setSelectedMovie({ id, type: typeVal });
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
    if (userInput.trim().length !== 0) setIsLoading(true);
    else setIsLoading(false);
  }, [userInput, setIsLoading]);

  return (
    <Fragment>
      <input
        className={classes.input}
        type='text'
        placeholder={placeholderText}
        value={userInput}
        onChange={inputChangeHandler}
      />

      {userInput.trim() !== '' && (
        <div className={classes['auto-box']}>
          {!isLoading &&
            autocomplete.map((obj) => (
              <span
                key={`auto_${obj.id}`}
                onClick={selectMovieHandler.bind(null, obj.id, obj.type)}
              >
                {obj.title ? obj.title : obj.name}
              </span>
            ))}
          {isLoading && <span>Searching...</span>}
        </div>
      )}

      {selectedMovie && (
        <MovieDetails
          id={selectedMovie.id}
          type={selectedMovie.type}
          onClose={closeDetailsHandler}
        />
      )}
    </Fragment>
  );
};

export default SearchInput;
