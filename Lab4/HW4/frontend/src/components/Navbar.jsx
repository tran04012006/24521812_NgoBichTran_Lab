import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="brand">
          <span className="brand-icon">FP</span>

          <span>FairPlay Portal</span>
        </NavLink>

        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/dossier/himass"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Himass
          </NavLink>

          <NavLink
            to="/dossier/tanvuu"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            TanVuu
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;