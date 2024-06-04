import { useState, useRef } from "react";
import "../../css/navBar.css";
import isLoged from "../../utils/isLoged";
import logout from "../../utils/logout";

function NavBar() {
  const [isLogged, setIsLogged] = useState(isLoged());
  const username = useRef(localStorage.getItem("username"));

  return (
    <nav
      className="navbar bg-success border-bottom border-body"
      data-bs-theme="success"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          english4learn &#x262F;
        </a>

        {isLogged ? (
          <span className="text-light navbar-toggler">
            Welcome {username.current}
          </span>
        ) : (
          <>Not Logged</>
        )}

        <div className="d-flex" role="search">
          {isLogged ? (
            <button
              className="btn btn-outline-light logoutBtn"
              onClick={() => {
                logout();
                setIsLogged(false);
              }}
            >
              Log out
            </button>
          ) : (
            <>
              <button
                className="btn btn-outline-light loginBtn"
                onClick={() => {
                  window.location.href = "/login";
                }}
              >
                Log in
              </button>
              <button
                className="btn btn-outline-light registerBtn"
                onClick={() => {
                  window.location.href = "/register";
                }}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
