import MovieItem from "./MovieItem";

function MoviesList({ movies, onSelectMovie }) {
  if (!movies) return <p className="message">No movies found</p>;

  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieItem
          movie={movie}
          key={movie.imdbID}
          onSelectMovie={onSelectMovie}
        >
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </MovieItem>
      ))}
    </ul>
  );
}

export default MoviesList;
