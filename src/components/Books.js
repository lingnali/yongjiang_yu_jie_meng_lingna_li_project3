import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import Book from "./Book";

const Books = () => {
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
    console.log(search);
    const res = await axios.get("/api/books", { params: { q: search } });
    if (res.status !== 200 || res.data.length === 0) {
      setSearch("");
      return setBooks([]);
    }
    setBooks(res.data);
    setSearch("");
  };

  return (
    <>
      {err && <p>{err.message}</p>}
      <div className="container-fluid w-25 mt-2">
        <form onSubmit={searchHandler} className="d-flex">
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          ></input>
          <button className="btn btn-outline-success">submit</button>
        </form>
      </div>

      {isLoggedIn && (
        <Link to="new">
          <button className="btn btn-outline-primary">Add a book</button>
        </Link>
      )}

      {books && books.length === 0 && <p>No books found!</p>}
      {books && (
        <div className="container mt-3">
          <div className="row">
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
