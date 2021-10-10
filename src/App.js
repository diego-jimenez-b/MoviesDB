import { Fragment, useCallback, useReducer } from 'react';
import { useEffect } from 'react';
import MainNavigation from './components/main-navigation/MainNavigation';
import MoviesList from './components/movies-list/MoviesList';
import mainBackground from './assets/images/main-background.jpg';
import { getMediaUrlByGenre, getTrendingUrl } from './api/api';
import useHttp from './hooks/useHttp';

const initialState = {
  mediaElements: [],
  nextPage: 1,
  mediaType: 'movie',
  genreId: 'any',
  loading: true,
};

const mediaReducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_TYPE':
      return {
        ...state,
        mediaType: action.mediaType,
        genreId: 'any',
        loading: true,
        nextPage: 1,
      };

    case 'SELECT_GENRE':
      return { ...state, genreId: action.genreId, loading: true, nextPage: 1 };

    case 'SET_MEDIA':
      return {
        ...state,
        mediaElements: action.mediaElements,
        loading: false,
        nextPage: state.nextPage + 1,
      };

    case 'ADD_MEDIA':
      return {
        ...state,
        mediaElements: [...state.mediaElements, ...action.mediaElements],
        nextPage: state.nextPage + 1,
      };

    default:
      return state;
  }
};

function App() {
  const { fetchData, isLoading: isFetching, error } = useHttp();
  const [mediaState, dispatch] = useReducer(mediaReducer, initialState);

  const { mediaType, mediaElements, nextPage, genreId, loading } = mediaState;

  const selectTypeHandler = useCallback((mediaType) => {
    if (mediaType === mediaState.mediaType) return;
    dispatch({ type: 'SELECT_TYPE', mediaType });
  }, [mediaState.mediaType]);
  const selectGenreHandler = useCallback((genreId) => {
    dispatch({ type: 'SELECT_GENRE', genreId });
  }, []);
  const setMediaElements = (mediaArray) => {
    dispatch({ type: 'SET_MEDIA', mediaElements: mediaArray });
  };
  const addMediaElements = (mediaArray) => {
    dispatch({ type: 'ADD_MEDIA', mediaElements: mediaArray });
  };

  const fetchMoviesHandler = useCallback(
    (pageNum) => {
      let url;
      if (mediaType === 'all') url = getTrendingUrl(mediaType);
      else
        url = getMediaUrlByGenre(
          mediaType,
          genreId === 'any' ? null : genreId,
          pageNum ? pageNum : null
        );

      fetchData(url, (data) => {
        if (pageNum) addMediaElements(data.results);
        else setMediaElements(data.results);
      });
    },
    [mediaType, fetchData, genreId]
  );

  useEffect(() => {
    fetchMoviesHandler();
  }, [mediaType, genreId, fetchMoviesHandler]);

  return (
    <Fragment>
      <img src={mainBackground} className='background' alt='background' />

      <div className='container'>
        <MainNavigation
          onChangeType={selectTypeHandler}
          displayType={mediaType}
        />

        <MoviesList
          moviesList={mediaElements}
          loading={loading}
          isFetching={isFetching}
          error={error}
          genreId={genreId}
          displayType={mediaType}
          onFetchMore={fetchMoviesHandler.bind(null, nextPage)}
          onSelectGenre={selectGenreHandler}
        />
      </div>
    </Fragment>
  );
}

export default App;
