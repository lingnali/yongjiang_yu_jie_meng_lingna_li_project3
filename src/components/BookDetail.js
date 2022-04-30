import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import Reviews from "./Reviews";

const BookDetail = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [err, setErr] = useState(null);
  const [average, setAverage] = useState(null);

  const calculateAvg = (reviews) => {
    if (reviews.length === 0) {
      setAverage(null);
    } else {
      const avg =
        reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length;
      setAverage(Math.round(avg * 10) / 10);
    }
  };

  useEffect(() => {
    axios
      .get(`/api${pathname}`)
      .then((res) => {
        setBook(res.data);
        calculateAvg(res.data.reviews);
      })
      .catch((err) => setErr(err));
  }, []);

  const deleteReviewHandler = async (url) => {
    try {
      await axios.delete(`/api${url}`);
      const res = await axios.get(`/api${pathname}`);
      setBook(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBookHandler = async (url) => {
    try {
      await axios.delete(`/api${url}`);
      navigate("/books");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {err && <p>{err.message}</p>}
      {book && (
        <div className="container d-flex p-3">
          <div className=" col-lg-5">
            <div className="row">
              <div className="card mx-3">
                <h2>{book.title}</h2>
                <p>
                  {book.author} ${book.price}
                </p>
                <h2>Rating: {average ? average : "not rated"}</h2>
                <p>Submitted by {book.creator.username}</p>
                {context.isLoggedIn && (
                  <Link to="reviews">
                    <button className="btn btn-outline-primary">
                      Add a review
                    </button>
                  </Link>
                )}
                <img src={book.image} alt={book.title} />
                <p>{book.description}</p>
                {context.username === book.creator.username && (
                  <>
                    <Link to="/books/edit" state={book}>
                      <button className="btn btn-primary">Edit</button>
                    </Link>
                    <button
                      onClick={() => deleteBookHandler(pathname)}
                      type="button"
                      className="btn btn-outline-danger w-50"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="card mx-3 border-0">
                <Reviews
                  reviews={book.reviews}
                  onDelete={deleteReviewHandler}
                  url={`${pathname}/reviews`}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookDetail;
