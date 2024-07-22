import { useState, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import ListBox from "./components/ListBox";
import MoviesList from "./components/movie/MoviesList";
import Summary from "./components/movie/Summary";
import MainBox from "./components/layout/MainBox";
import Loader from "./components/ui/Loader";
import Error from "./components/ui/Error";
import MovieDetails from "./components/movie/MovieDetails";
import WatchedList from "./components/movie/WatchedList";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageStaet } from "./hooks/useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [watched, setWatched] = useLocalStorageStaet([], "watched");

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  const handleAddWatched = (movie) => {
    const id = watched.find((mov) => mov.imdbID === movie.imdbID);
    if (!id) setWatched((watched) => [...watched, movie]);
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((mov) => mov.imdbID !== id));
  };

  return (
    <>
      <Navbar query={query} movies={movies} setQuery={setQuery} />

      <MainBox>
        <ListBox>
          {isLoading && <Loader />}
          {error && <Error message={error} />}
          {!isLoading && !error && (
            <MoviesList onSelectMovie={handleSelectMovie} movies={movies} />
          )}
        </ListBox>

        <ListBox>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedList
                movies={watched}
                onDeleteMovie={handleDeleteWatched}
              />
            </>
          )}
        </ListBox>
      </MainBox>
    </>
  );
}
