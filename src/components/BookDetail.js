import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import Reviews from "./Reviews";
import Error from "./Error";
import "./style.css";

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
      {err && <Error err={err.message} />}
      {book && (
        <div className="container d-flex justify-content-around mt-3">
          <div className="col-lg-5">
            <div className="row">
              <div className="card border-0">
                <div className="card-header bg-transparent h-auto">
                  <h4>{book.title}</h4>
                  <h5>Author: {book.author}</h5>
                </div>
                <div className="card-body d-flex flex-column">
                  <div className="pb-1">
                    <h4>Price: ${book.price}</h4>
                  </div>
                  <h4>Rating: {average ? average : "not rated"}</h4>
                  <p>Submitted by {book.creator.username}</p>
                  <div className="pb-3">
                    {context.isLoggedIn && (
                      <Link to="reviews">
                        <button className="btn btn-outline-primary">
                          Add a review
                        </button>
                      </Link>
                    )}
                  </div>
                  <div className="pb-2">
                    <img src={book.image} alt={book.title} />
                  </div>
                  <div className="pb-2 border border-light border-4 border-end-0 border-start-0">
                    <p>{book.description}</p>
                  </div>
                  <div className="card-footer bg-transparent border-0">
                    <div className="d-flex justify-content-between">
                      {context.username === book.creator.username && (
                        <>
                          <Link to="/books/edit" state={book}>
                            <button className="btn btn-outline-primary btn-lg fs-6">
                              Edit Book
                            </button>
                          </Link>
                          <button
                            onClick={() => deleteBookHandler(pathname)}
                            type="button"
                            className="btn btn-outline-danger fs-6"
                          >
                            Delete Book
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="card mt-3 border-0">
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
