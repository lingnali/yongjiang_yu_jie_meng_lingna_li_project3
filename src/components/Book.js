import { Link } from "react-router-dom";
const Book = ({ _id, title, author, image }) => {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card mb-4 mx-2">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>

          <p>{author}</p>

          <Link to={`${_id}`}>
            <button className="btn btn-primary">Details</button>
          </Link>
        </div>
        <img src={image} className="card-img-bottom img-fluid" alt={title} />
      </div>
    </div>
  );
};

export default Book;
