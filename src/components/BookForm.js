import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Error from "./Error";

const BookForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    title = "",
    author = "",
    image = "",
    price = 0,
    description = "",
    _id = "",
  } = location.state || {};

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { title, author, image, price, description } });

  let err = null;
  const onSubmit = async (data, e) => {
    let res;
    if (location.state) {
      res = await axios.put(`/api/books/${_id}`, { book: data });
      if (res.status === 200) {
        navigate(`/books/${_id}`);
      } else {
        err = res.data;
      }
    } else {
      res = await axios.post("/api/books", { book: data });
      if (res.status === 200) {
        navigate(-1);
      } else {
        err = res.data;
      }
    }
    reset();
  };

  return (
    <>
      {err && <Error err={err} />}
      {!err && (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-10 col-md-8 col-lg-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mt-3">
                  <div className="col-lg-5">
                    <label htmlFor="title" className="form-label">
                      Book Name
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      {...register("title", {
                        required: "Title cannot be empty",
                      })}
                    />
                    <p className="text-danger">{errors.title?.message}</p>
                  </div>
                  <div className="col-lg-4">
                    <label htmlFor="author" className="form-label">
                      Author
                    </label>
                    <input
                      type="text"
                      name="author"
                      className="form-control"
                      {...register("author", {
                        required: "Title cannot be empty",
                      })}
                    />
                    <p className="text-danger">{errors.author?.message}</p>
                  </div>
                  <div className="col-lg-3">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>

                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                      </div>

                      <input
                        type="number"
                        name="price"
                        step="any"
                        className="form-control"
                        {...register("price", {
                          required: "Price cannot be empty",
                          min: {
                            value: 0,
                            message: "Price cannot be negative",
                          },
                        })}
                      />
                    </div>
                    <p className="text-danger">{errors.price?.message}</p>
                  </div>
                </div>
                <label htmlFor="image" className="form-label">
                  Image URL
                </label>
                <input
                  name="image"
                  type="text"
                  className="form-control"
                  {...register("image", {
                    required: "Image cannot be empty",
                    pattern: {
                      value: /^(http|https):\/\/[^ "]+$/,
                      message: "URL pattern: https://example.com/image.jpg",
                    },
                  })}
                />
                <p className="text-danger">{errors.image?.message}</p>

                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  type="text"
                  name="description"
                  rows="5"
                  className="form-control"
                  {...register("description", {
                    required: "Description cannot be empty",
                  })}
                />
                <p className="text-danger">{errors.description?.message}</p>

                <button type="submit" className="btn btn-secondary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookForm;
