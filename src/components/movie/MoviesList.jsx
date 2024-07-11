import MovieItem from "./MovieItem";

function MoviesList({ movies, type }) {
  return (
    <ul className="list">
      {type === "movies" &&
        movies?.map((movie) => (
          <MovieItem movie={movie} key={movie.imdbID}>
            <div>
              <p>
                <span>🗓</span>
                <span>{movie.Year}</span>
              </p>
            </div>
          </MovieItem>
        ))}
      {type === "watched" &&
        movies?.map((movie) => (
          <MovieItem movie={movie} key={movie.imdbID}>
            <div>
              <p>
                <span>⭐️</span>
                <span>{movie.imdbRating}</span>
              </p>
              <p>
                <span>🌟</span>
                <span>{movie.userRating}</span>
              </p>
              <p>
                <span>⏳</span>
                <span>{movie.runtime} min</span>
              </p>
            </div>
          </MovieItem>
        ))}
    </ul>
  );
}

export default MoviesList;
