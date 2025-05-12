// components/Navbar.jsx
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-card shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/"><i className="fa-solid fa-music"></i> My Music Library</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                to="/albums"
                className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold' : ''}`}
              >
                Album
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/artists"
                className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold' : ''}`}
              >
                Artisti
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/songs"
                className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold' : ''}`}
              >
                Canzoni
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
