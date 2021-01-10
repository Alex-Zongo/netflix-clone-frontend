import React from "react";

import requests from "./request";
import Row from "./Row";
import Banner from "./Banner";

function Welcome() {
  return (
    <div>
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentariesMovie} />
      <Row title="Anime" fetchUrl={requests.fetchAnimationMovies} />
      <Row title="Family Movies" fetchUrl={requests.fetchFamilyMovies} />
      <Row title="Science Fictions" fetchUrl={requests.fetchSciencesFictions} />
      <Row title="TV Movies" fetchUrl={requests.fetchTVMovies} />
    </div>
  );
}

export default Welcome;
