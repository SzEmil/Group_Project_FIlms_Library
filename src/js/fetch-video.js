'use strict';

// zapytanie o film zgodny z wartością przekazaną w input
export const fetchVideo = async (name, pageNumber) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=5349b69c770fce41df09c49c43dbcd6b&language=en-US&query=${name}&page=${pageNumber}&include_adult=true`
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
