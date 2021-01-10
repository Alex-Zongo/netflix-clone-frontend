import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CredentialsContext } from "./App";
import "./MyList.css";
import { backendURL } from "./request";

function MyList() {
  const [mylist, setMylist] = useState(null);
  const [credentials] = useContext(CredentialsContext);
  const token = credentials
    ? `${credentials.username}:${credentials.password}`
    : "";
  const imgUrl = "https://image.tmdb.org/t/p/original";

  //get mylist from the DB, and update the state

  useEffect(() => {
    axios
      .get(backendURL + "mylist/", {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((response) => setMylist(response.data))
      .catch((error) => console.log(error));
  }, [token]);
  console.log(mylist);

  // render the movies in the list
  return (
    <div className="mylist-container">
      <h1 className="mylist-title">My List to Watch</h1>
      <div className="movies_posters">
        {mylist &&
          mylist.map((movie) => (
            <div className="movie" key={movie.id}>
              <img
                className="movie_poster"
                src={`${imgUrl}${movie.backdrop_path}`}
                alt={movie.name}
              />
              <span>{movie.name}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MyList;
