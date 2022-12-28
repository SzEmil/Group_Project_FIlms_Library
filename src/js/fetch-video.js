'use strict';

// export const fetchVideo = async (name, pageNumber) => {
//   const response = await fetch();
//   const videos = await response.json(
//     `https://api.themoviedb.org/3/search/movie?api_key=5349b69c770fce41df09c49c43dbcd6b&language=en-US&query=${name}&page=${pageNumber}&include_adult=true`
//   );

//   return videos;
// };

// export const fetchVideoPopular = async () => {
//   const response = await fetch();
//   const videos = await response.json(
//     `https://api.themoviedb.org/3/trending/movie/week?api_key=5349b69c770fce41df09c49c43dbcd6b`
//   );

//   return videos;
// };

export const fetchVideo = (name, pageNumber) => {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=5349b69c770fce41df09c49c43dbcd6b&language=en-US&query=${name}&page=${pageNumber}&include_adult=true`
  )
    .then(response => {
      if (!response) {
        throw new Error('Failed to fetch video API');
      }
      return response.json();
    })
    .catch(error => {
      console.error(error);
    });
};
