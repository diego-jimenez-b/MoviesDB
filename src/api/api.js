export const config = {
  url: 'https://api.themoviedb.org/3',
  apiKey: '282f63039879e23307f585741fbb6e92',
};

export const getImgUrl = (resolution, path) => {
  return `https://image.tmdb.org/t/p/w${resolution}/${path}`;
};

export const getTrendingUrl = (type) => {
  const typePath = `/trending/${type}/week`;
  const url = `${config.url}${typePath}?api_key=${config.apiKey}`;
  return url;
};

export const getMediaUrl = (type, id) => {
  return `${config.url}/${type}/${id}?api_key=${config.apiKey}`;
};

export const getAutocompleteUrl = (type, input) => {
  return `${config.url}/search/${type}/?api_key=${config.apiKey}&query=${input}`;
};

export const getMediaUrlByGenre = (type, genreId) => {
  return `${config.url}/discover/${type}?api_key=${config.apiKey}&with_genres=${genreId}`;
};
