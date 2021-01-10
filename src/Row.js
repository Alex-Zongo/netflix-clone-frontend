import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Row.css";

import { CredentialsContext } from "./App";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { backendURL } from "./request";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  const [credentials] = useContext(CredentialsContext);
  const token = credentials
    ? `${credentials.username}:${credentials.password}`
    : "";
  const [trailerUrl, setTrailerUrl] = useState("");
  const baseUrl = "https://api.themoviedb.org/3";
  const imgUrl = "https://image.tmdb.org/t/p/original";
  // A snippet of code running on specific conditions
  useEffect(() => {
    // if [], run once when the row loads, and dont run again
    async function fetchData() {
      const request = await axios.get(baseUrl + fetchUrl);

      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  const getMylist = async () => {
    const resp = await axios.get(backendURL + "mylist", {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    return resp.data;
  };

  const addMylistToDB = async (list) => {
    await axios.post(backendURL + "addtomylist", list, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
  };

  const addToMyList = async (movie) => {
    const newMovie = {
      id: movie.id,
      name: movie.title,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
    };
    const list = await getMylist();
    let newMovielist = [];
    const newlist = list.filter(
      (movie) =>
        movie.name !== newMovie.name ||
        movie.backdrop_path !== newMovie.backdrop_path
    );
    console.log(newlist);
    newMovielist = [...newlist, newMovie];
    console.log(newMovielist);
    addMylistToDB(newMovielist);
  };

  return (
    <div className="row">
      {/* title */}
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <div className="movie_div" key={movie.id}>
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${imgUrl}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.title}
            />
            {credentials && (
              <>
                <h3 className="title">{movie.title}</h3>
                <button onClick={() => addToMyList(movie)}>
                  add to mylist
                </button>
              </>
            )}
          </div>
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
