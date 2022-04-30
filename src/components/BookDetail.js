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
      .get(pathname)
      .then((res) => {
        setBook(res.data);
        calculateAvg(res.data.reviews);
      })
      .catch((err) => setErr(err));
  }, []);

  const deleteReviewHandler = async (url) => {
    try {
      await axios.delete(url);
      const res = await axios.get(pathname);
      setBook(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBookHandler = async (url) => {
    try {
      await axios.delete(url);
      navigate("/books");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {err && <p>{err.message}</p>}
      {book && (
        <div className="container d-flex justify-content-around mt-3">
          <div className="col-lg-5">
            <div className="row">
              <div className="card mx-3">
                <div className="card-header">
                  <h4>{book.title}</h4>
                  <h5>Author: {book.author}</h5>
                </div>
                <div className="card-body d-flex flex-column mb-3">
                  <div className="p-2">
                    <h4>Price: ${book.price}</h4>
                  </div>
                  <div className="p-2">
                    <h4>Rating: {average ? average : "not rated"}</h4>
                    <p>Submitted by {book.creator.username}</p>
                  </div>
                  <div className="p-2">
                    {context.isLoggedIn && (
                      <Link to="reviews">
                        <button className="btn btn-outline-primary">
                          Add a review
                        </button>
                      </Link>
                    )}
                  </div>
                  <div className="p-2">
                    <img src={book.image} alt={book.title} />
                  </div>
                  <div className="p-2">
                    <p>{book.description}</p>
                  </div>

                  <div className="d-flex justify-content-between p-2">
                    {context.username === book.creator.username && (
                      <>
                        <Link to="/books/edit" state={book}>
                          <button className="btn btn-primary btn-lg">Edit Book</button>
                        </Link>
                        <button
                          onClick={() => deleteBookHandler(pathname)}
                          type="button"
                          className="btn btn-danger ">
                          Delete Book</button>
                      </>
                    )}
                  </div>
                </div>
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
