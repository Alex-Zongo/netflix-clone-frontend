const API_KEY = process.env.REACT_APP_API_KEY;

export const backendURL = "https://a-netflix-clone-backend.herokuapp.com/";

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentariesMovie: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchAnimationMovies: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
  fetchFamilyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=14`,
  fetchSciencesFictions: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
  fetchTVMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10770`,
};

export default requests;
