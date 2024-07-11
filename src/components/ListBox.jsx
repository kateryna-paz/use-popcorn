import MoviesList from "./movie/MoviesList";
import Summary from "./movie/Summary";
import Button from "./ui/Button";

function ListBox({ isOpen, setIsOpen, movies, type }) {
  return (
    <div className="box">
      <Button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </Button>
      {isOpen && type === "movies" && (
        <MoviesList movies={movies} type={type} />
      )}
      {isOpen && type === "watched" && (
        <>
          <Summary watched={movies} />

          <MoviesList movies={movies} type="watched" />
        </>
      )}
    </div>
  );
}

export default ListBox;
