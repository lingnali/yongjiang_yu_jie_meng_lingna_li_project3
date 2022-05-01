import { Link } from "react-router-dom";

const Error = (props) => {
  return (
    <>
      <div className="container mt-3 ms-2">
        <Link to="/books">
          <button className="btn btn-outline-secondary">Back to home</button>
        </Link>
      </div>

      <div className="row mt-5">
        <div className="col-6 offset-3">
          <div className="alert alert-secondary" role="alert">
            <h4 className="alert-heading">Error {!props.err && "404"}</h4>
            <p>Admin is busy reading, please try another page.</p>
            <p>{props.err}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
