'use strict';

// zapytanie o film zgodny z wartością przekazaną w input
export const fetchVideo = async (name, pageNumber) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=5349b69c770fce41df09c49c43dbcd6b&language=en-US&query=${name}&page=${pageNumber}&include_adult=false`
  );
  const videos = await response.json();

  return videos;
};

// zapytanie o najpopularniejsze filmy w tym tygodniu
export const fetchVideoPopular = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=5349b69c770fce41df09c49c43dbcd6b`
  );
  const videos = await response.json();

  return videos;
};

// zapytanie o szczegółowe informacje dotyczące filmu
export const fetchDetails = async movieId => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=5349b69c770fce41df09c49c43dbcd6b&language=en-US`
  );

  const videoDetails = await response.json();

  return videoDetails;
};

// zapytanie o gatunki
export const fetchGenres = async () => {
  const response = await fetch(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=5349b69c770fce41df09c49c43dbcd6b&language=en-US'
  );

  const movieGenresList = await response.json();

  return movieGenresList;
};
