import { Link } from "react-router-dom";
import "./style.css";

const Book = ({ _id, title, author, image }) => {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card mb-4 mx-2">
        <div className="card-header overflow-auto">
          <header>{title}</header>
        </div>
        <div className="card-body">
          <h5 className="card-text">Author: {author}</h5>
          <Link to={`${_id}`}>
            <button className="btn btn-info">Details</button>
          </Link>
        </div>
        <img
          src={image}
          className="img-fluid card-img-top embed-responsive-item"
          alt={title}
        />
      </div>
    </div>
  );
};

export default Book;
