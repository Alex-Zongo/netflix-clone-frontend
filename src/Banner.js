import React, { useState, useEffect } from "react";
import axios from "axios";
import requests from "./request";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);
  const baseUrl = "https://api.themoviedb.org/3";
  const imgUrl = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `${baseUrl}${requests.fetchNetflixOriginals}`
      );
      const movieData = request.data.results;
      console.log(movieData[Math.floor(Math.random() * movieData.length)]);

      setMovie(movieData[Math.floor(Math.random() * movieData.length)]);
    }
    fetchData();
  }, []);

  console.log(movie);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${imgUrl}${movie.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie.title || movie.name || movie.original_name}
        </h1>

        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>

        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
        {/* descripttion */}
      </div>

      <div className="banner__fadeBottom"></div>
    </header>
  );
}

export default Banner;
