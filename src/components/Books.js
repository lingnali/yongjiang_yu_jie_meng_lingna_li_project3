import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import Book from "./Book";
import Error from "./Error";

const Books = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [books, setBooks] = useState(null);
  const [err, setErr] = useState(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get("/api/books")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => setErr(err));
  }, []);

  const searchHandler = async (event) => {
    event.preventDefault();
    if (!search) return;
    const { status, data } = await axios.get("/api/books", {
      params: { q: search },
    });
    navigate("searchresult", { state: { status, data } });
    setSearch("");
  };

  return (
    <>
      {err && <Error err={err.message} />}
      <div className="container">
        <form onSubmit={searchHandler}>
          <div className="row justify-content-center mt-3 mx-1">
            <div className="input-box col-sm-8  col-sm-6 col-lg-4">
              <input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              ></input>
            </div>
          </div>
        </form>
      </div>

      <div className="d-flex justify-content-center mt-3">
        {isLoggedIn && (
          <Link to="new">
            <button className="btn btn-primary btn-lg">Add A Book</button>
          </Link>
        )}
      </div>
      {books && books.length === 0 && <p>No books found!</p>}
      {books && (
        <div className="container mt-3">
          <div className="row justify-content-start">
            {books.map((book) => {
              return <Book key={book._id} {...book} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Books;
