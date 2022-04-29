import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const Reviews = (props) => {
  const { username } = useContext(AuthContext);
  return (
    <>
      {props.reviews.map((review) => {
        return (
          <div className="card mb-3 d-flex" key={review._id}>
            <h2>{review.creator.username}</h2>
            <h2>{review.rating}</h2>
            <p>{review.body}</p>
            <p>{review.createDate.substring(0, 10)}</p>
            {username === review.creator.username && (
              <>
                <Link to={`reviews/${review._id}`} state={review}>
                  <button className="btn btn-primary">Edit</button>
                </Link>
                <button
                  onClick={() => props.onDelete(`${props.url}/${review._id}`)}
                  className="btn btn-primary"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Reviews;
