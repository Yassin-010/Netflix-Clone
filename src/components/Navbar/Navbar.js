import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar__logo">Netflix Clone</h1>
      <div className="navbar__links">
        <h4 className="navbar__link">
          <Link to="/favlist">Favorite List</Link>
        </h4>
        <h4 className="navbar__link">
          <Link to="/">Home</Link>
        </h4>
      </div>
    </nav>
  );
}

export default Navbar;