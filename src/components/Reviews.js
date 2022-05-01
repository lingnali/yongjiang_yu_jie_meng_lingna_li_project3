import { Link } from "react-router-dom";
import { useContext } from "react";
import ReactStars from "react-rating-stars-component";
import AuthContext from "../contexts/AuthContext";
import "./style.css";

const Reviews = (props) => {
  const { username } = useContext(AuthContext);
  return (
    <>
      {props.reviews.map((review) => {
        return (
          <div className="card mb-2 d-flex" key={review._id}>
            <div className="card-header h-auto">
              <h4>Reviewer: {review.creator.username}</h4>
              <ReactStars
                name="rating"
                count={5}
                value={review.rating}
                size={24}
                edit={false}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />
            </div>
            <div className="card-body d-flex flex-column bd-highlight mb-2">
              <div className="px-2 bd-highlight">
                <p>Comment: {review.body}</p>
              </div>
              <div className="px-2 bd-highlight">
                <p>Date Created: {review.createDate.substring(0, 10)}</p>
              </div>
              <div className="px-2 bd-highlight">
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
