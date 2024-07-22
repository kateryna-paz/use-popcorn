import { useEffect, useRef, useState } from "react";
import StarRaiting from "../starRaiting/StarRaiting";
import Loader from "../ui/Loader";
import { useKey } from "../../hooks/useKey";

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const isWatched = watched.map((mov) => mov.imdbID).includes(selectedId);
  const savedUserRating = watched.find(
    (mov) => mov.imdbID === selectedId
  )?.userRating;
  const [userRating, setUserRating] = useState(0);

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  const apiKey = "60943003";

  const {
    Title,
    Year,
    Poster,
    Runtime: runtime,
    Plot: plot,
    imdbRating,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      Title,
      Year,
      Poster,
      userRating,
      imdbRating: Number(imdbRating),
      runtime: runtime ? Number(runtime.split(" ").at(0)) : 0,
      countRatingDecisions: countRef.current,
    };
    console.log(newWatchedMovie);
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  useKey("Escape", onCloseMovie);

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?i=${selectedId}&apikey=${apiKey}`
        );

        if (!res.ok) {
          throw new Error("Something went wrong with fetching movie");
        }

        const data = await res.json();

        setMovie(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }

    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!Title) return;
    document.title = `Movie | ${Title}`;

    return function () {
      document.title = "Use Popcorn";
    };
  }, [Title]);
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={Poster} alt={`Poster of ${Title} movie`} />
            <div className="details-overview">
              <h2>{Title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p> {genre} </p>
              <p>
                <span>⭐</span> {imdbRating} IMDb raiting
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRaiting
                    maxRaiting={10}
                    size={24}
                    onSetRaiting={setUserRating}
                    defaultRaiting={userRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You've already rated this movie with {savedUserRating} stars.
                </p>
              )}
            </div>

            <p>
              <em> {plot} </em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
