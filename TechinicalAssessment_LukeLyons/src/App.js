import React from "react";
import "./styles.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [changeMovie, setChangeMovie] = useState(0);

  useEffect(() => {
    const url =
      "https://raw.githubusercontent.com/WhiteNoiz-22/moviesDatabase/refs/heads/main/movies(1).json";

    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setData(json.movies);
        setLoading(false);
      } catch (errorMessage) {
        setLoading(false);
        setError(true);
        console.log(errorMessage);
      }
    }

    fetchData();
  }, []);

  const handleNextMovie = () => {
    setChangeMovie((current) => (current + 1) % data.length);
  };

  const handlePreviousMovie = () => {
    setChangeMovie((current) => (current - 1 + data.length) % data.length);
  };

  if (isLoading) {
    return <h3>Loading Movies...</h3>;
  } else if (error) {
    return <h3>An error has occurred: {error}</h3>;
  } else {
    return (
      <DisplayMoviesComponent
        dataFromParent={data}
        changeMovieFromParent={changeMovie}
        handleNextMovieFromParent={handleNextMovie}
        handlePreviousMovieFromParent={handlePreviousMovie}
      />
    );
  }
}

function DisplayMoviesComponent(props) {
  const {
    dataFromParent,
    changeMovieFromParent,
    handleNextMovieFromParent,
    handlePreviousMovieFromParent,
  } = props;

  const currentMovie = dataFromParent[changeMovieFromParent];

  if (!currentMovie) {
    return <h3>Error: Unable to load API</h3>;
  }

  const actors = currentMovie.mainActors.map((actor, index) => (
    <p key={index}>{actor}</p>
  ));

  return (
    <>
      <header>
        <h1>Movies Database Application</h1>
      </header>

      <h2>{currentMovie.title}</h2>
      <p>
        <b>Plot: </b>
        {currentMovie.plot}
      </p>
      <p>
        <b>Director: </b> {currentMovie.director}
      </p>
      <p>
        <b>Actors: </b> {actors}
      </p>
      <p>
        <b>Release Year: </b> {currentMovie.releaseYear}
      </p>
      <button onClick={handlePreviousMovieFromParent}>Previous Movie</button>
      <button onClick={handleNextMovieFromParent}>Next Movie</button>
    </>
  );
}

export default App;
