import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import "./style.css";

const Reviews = (props) => {
  const { username } = useContext(AuthContext);
  return (
    <>
      {props.reviews.map((review) => {
        return (
          <div className="card mb-3 d-flex" key={review._id}>
            <div className="card-header">
              <h4>Reviewer: {review.creator.username}</h4>
              <h6>Rating: {review.rating}</h6>
            </div>
            <div className="card-body d-flex flex-column bd-highlight mb-3">
              <div className="p-2 bd-highlight"></div>
              <div className="p-2 bd-highlight">
                <p>Comment: {review.body}</p>
              </div>
              <div className="p-2 bd-highlight">
                <p>Date Created: {review.createDate.substring(0, 10)}</p>
              </div>
              <div className="p-2 bd-highlight">
                {username === review.creator.username && (
                  <>
                    <div className="d-flex justify-content-between">
                      <Link to={`reviews/${review._id}`} state={review}>
                        <button className="btn btn-primary">Edit Review</button>
                      </Link>
                      <button
                        onClick={() =>
                          props.onDelete(`${props.url}/${review._id}`)
                        }
                        className="btn btn-danger"
                      >
                        Delete Review
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Reviews;
