import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import Error from "./Error";

const ReviewForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { rating = 1, body = "" } = location.state || {};

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: { rating, body } });

  register("rating", {
    required: "Rating is required",
    min: {
      value: 1,
      message: "The minimum rating is one star.",
    },
  });

  let err = null;
  const onSubmit = async (data, e) => {
    let res;
    if (location.state) {
      res = await axios.put(`/api${location.pathname}`, { review: data });
    } else {
      res = await axios.post(`/api${location.pathname}`, { review: data });
    }
    if (res.status === 200) {
      navigate(-1);
    } else {
      err = res.data;
    }
    reset();
  };

  return (
    <>
      {err && <Error err={err} />}
      {!err && (
        <div className="container mt-3">
          <div className="row justify-content-center">
            <div className="col-sm-8 col-md-6 col-lg-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="rating" className="form-label">
                  Rating
                </label>
                <ReactStars
                  name="rating"
                  count={5}
                  value={getValues("rating")}
                  onChange={(rating) =>
                    setValue("rating", rating, { shouldValidate: true })
                  }
                  size={24}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
                <p className="text-danger">{errors.rating?.message}</p>
                <label htmlFor="body" className="form-label">
                  Review
                </label>
                <textarea
                  type="text"
                  name="body"
                  rows="5"
                  className="form-control"
                  {...register("body", {
                    required: "Review cannot be empty",
                  })}
                />
                <p className="text-danger">{errors.body?.message}</p>
                <button type="submit" className="btn btn-secondary float-end">
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

export default ReviewForm;
