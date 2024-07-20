import WatchedItem from "./WatchedItem";

function WatchedList({ movies, onDeleteMovie }) {
  if (movies.length === 0)
    return (
      <p className="message">
        There are no movies yet. Choose a movie and add the first one!
      </p>
    );
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <WatchedItem
          movie={movie}
          key={movie.imdbID}
          onDeleteMovie={onDeleteMovie}
        ></WatchedItem>
      ))}
    </ul>
  );
}

export default WatchedList;
