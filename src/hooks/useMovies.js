import { useEffect, useState } from "react";

const apiKey = "60943003";

export const useMovies = (query, callback) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    callback?.();
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
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
};
