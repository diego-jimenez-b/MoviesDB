import { Fragment, useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { getImgUrl, getMediaUrl } from '../../api/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import Modal from '../UI/Modal';

import classes from './MovieDetails.module.css';

const MovieDetails = ({ id, type, onClose }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(getMediaUrl(type, id))
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, [id, type]);

  if (!data) {
    return (
      <Modal className={classes.message}>
        <LoadingSpinner />
      </Modal>
    );
  }

  console.log(data);

  const {
    poster_path,
    title,
    name,
    tagline,
    overview,
    genres,
    release_date,
    production_companies,
    runtime,
    revenue,
    vote_average,
    first_air_date,
    number_of_seasons,
    number_of_episodes,
  } = data;

  return (
    <Modal onClose={onClose} className={classes['movie-container']}>
      <img
        src={getImgUrl(500, poster_path)}
        width='370px'
        alt={title ? title : name}
      />

      <div className={classes.info}>
        <h2>{title ? title : name}</h2>
        <h3>{tagline}</h3>
        <p>{overview}</p>

        {genres && <span>{genres.map((genre) => genre.name + ' ')}</span>}
        {production_companies && (
          <span>
            {production_companies.map((company) => company.name + ' ')}
          </span>
        )}

        <div className={classes['info-sections']}>
          <div>
            {title ? 'Original Release' : 'First air date'}
            <span>{title ? release_date : first_air_date}</span>
          </div>

          {title && (
            <Fragment>
              <div>
                Running Time: <span>{runtime} minutes</span>
              </div>
              <div>
                Box Office: $<span>{revenue === 0 ? '--' : revenue}</span>
              </div>
            </Fragment>
          )}
          {name && (
            <Fragment>
              <div>
                Number of seasons: <span>{number_of_seasons}</span>
              </div>
              <div>
                Number of episodes: <span>{number_of_episodes}</span>
              </div>
            </Fragment>
          )}

          <div>
            Vote average: <span>{vote_average}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MovieDetails;
