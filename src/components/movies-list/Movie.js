import { memo } from 'react';
import classes from './Movie.module.css';

const Movie = ({ data, onShowDetails }) => {
  const selectDetailsHandler = () => {
    let type;
    if (data.media_type) type = data.media_type === 'movie' ? 'movie' : 'tv';
    onShowDetails(data.id, type);
  };


  return (
    <li className={classes['movie-item']} onClick={selectDetailsHandler}>
      <img
        src={`https://image.tmdb.org/t/p/w300/${data.poster_path}`}
        alt={data.title}
      />
      <div>
        <h2>{data.title ? data.title : data.name}</h2>
      </div>
      <span className={classes.btn}>
        {data.vote_average * 10}
        <span>%</span>
      </span>
    </li>
  );
};

export default memo(Movie);
