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

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const apiKey = "60943003";

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };
  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie) => {
    const id = watched.find((mov) => mov.imdbID === movie.imdbID);

    if (!id) setWatched((watched) => [...watched, movie]);
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((mov) => mov.imdbID !== id));
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Something went wrong with fetching movies");
        }

        const data = await res.json();

        if (data.Error === "Movie not found!") {
          setError("Movie not found!");
        } else {
          setError("");
          setMovies(data.Search);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 2) {
      setMovies([]);
      setError("");
      return;
    }

    handleCloseMovie();
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

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
