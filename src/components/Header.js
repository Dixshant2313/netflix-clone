import { useNavigate, Link, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate("/login");
  }

  const handleSignOut = (e) => {
    e.preventDefault();
    navigate("/");
  }

  const isDashboard = location.pathname === "/dashboard";

  return (
    <header className="topNav">
      <nav className="navbar navbar-expand-md navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              className="nav__logo"
              src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
              alt=""
            />
          </Link>

          <div className="navbar">
            <form className="d-flex" role="search">
              <select>
                <option>English</option>
                <option>Hindi</option>
              </select>
              {isDashboard ? (
                <button className="btn btn-danger" onClick={handleSignOut}>
                  Signout
                </button>
              ) : (
                <button className="btn btn-danger" onClick={handleSignIn}>
                  Signin
                </button>
              )}
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
