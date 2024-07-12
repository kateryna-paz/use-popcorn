import Input from "../ui/Input";
import Logo from "../ui/Logo";

function Navbar({ query, movies, setQuery }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Input placeholder="Search movies..." value={query} onChange={setQuery} />

      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    </nav>
  );
}

export default Navbar;
