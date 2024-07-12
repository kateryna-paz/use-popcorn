import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import ListBox from "./components/ListBox";
import { tempMovieData, tempWatchedData } from "./storage/index";
import MoviesList from "./components/movie/MoviesList";
import Summary from "./components/movie/Summary";
import MainBox from "./components/layout/MainBox";
import StarRaiting from "./starRaiting/StarRaiting";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <Navbar query={query} movies={movies} setQuery={setQuery} />

      <MainBox>
        <ListBox>
          <MoviesList movies={movies} type="movies" />
        </ListBox>

        <ListBox>
          <Summary watched={watched} />
          <MoviesList movies={watched} type="watched" />
        </ListBox>
      </MainBox>
    </>
  );
}
