import { useLocation, Link } from "react-router-dom";
import Book from "./Book";
import Error from "./Error";

const SearchResult = () => {
  const { state } = useLocation();
  const { status, data } = state;
  let err = null;
  if (status !== 200) {
    err = data;
  }
  return (
    <>
      {err && <Error err={err} />}
      {!err && (
        <>
          <div className="container mt-3 ms-2">
            <Link to="/books">
              <button className="btn btn-outline-secondary">Back</button>
            </Link>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <div class="alert alert-light w-25 text-center" role="alert">
              {data.length === 0 && "No books found!"}
            </div>
          </div>
          {data.length !== 0 && (
            <div className="container mt-3">
              <div className="row justify-content-center">
                {data.map((book) => {
                  return <Book key={book._id} {...book} />;
                })}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SearchResult;
