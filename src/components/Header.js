import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";

const Header = () => {
  const context = useContext(AuthContext);
  const isLoggedIn = context.isLoggedIn;

  useEffect(() => {
    axios
      .get("/api/authenticate")
      .then((res) => {
        if (res.data !== "err") context.login(res.data);
      })
      .catch((err) => console.log("User is not logged in"));
  }, []);

  const logoutHandler = async () => {
    const res = await axios.post("/api/logout");
    if (res.status !== 200) {
      console.log(res);
    }
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-secondary bg-opacity-50 py-0 justify-content-between">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img
            src="/logo152.png"
            width="25"
            height="25"
            className="d-inline-block align-text-center mx-2"
            alt="logo"
          />
          Book Review
        </Link>

        <div className="nav ">
          {!isLoggedIn && (
            <Link to="/register" className="nav-link">
              Register
            </Link>
          )}
          {!isLoggedIn && (
            <Link to="/login" className="nav-link">
              Log in
            </Link>
          )}
          {isLoggedIn && (
            <span
              onClick={() => {
                context.logout();
                logoutHandler();
              }}
              className="nav-link"
            >
              Logout
            </span>
          )}
          {isLoggedIn && (
            <span className="navbar-brand fs-5 fw-light">
              {context.username}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
