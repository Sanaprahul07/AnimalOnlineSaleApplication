
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          Animal Sale
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto">

            {/* Home */}
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>

            {/* Animals */}
            <li className="nav-item">
              <a className="nav-link" href="#">
                Animals
              </a>
            </li>

            {/* Sellers */}
            <li className="nav-item">
              <a className="nav-link" href="#">
                Sellers
              </a>
            </li>

            {/* About */}
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>

            {/* Contact */}
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>

            {/* Login */}
            <li className="nav-item">
              <Link
                className="nav-link btn btn-success text-white ms-2 px-3"
                to="/login"
              >
                Login
              </Link>
            </li>

            {/* Register */}
            <li className="nav-item">
              <Link
                className="nav-link btn btn-warning text-dark ms-2 px-3"
                to="/register"
              >
                Register
              </Link>
            </li>

          </ul>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;