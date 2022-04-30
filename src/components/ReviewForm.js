import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const ReviewForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { rating = 0, body = "" } = location.state || {};

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { rating, body } });

  const onSubmit = async (data, e) => {
    let res;
    if (location.state) {
      res = await axios.put(location.pathname, { review: data });
    } else {
      res = await axios.post(location.pathname, { review: data });
    }
    if (res.status === 200) {
      navigate(-1);
    }
    reset();
  };

  return (
    <div className="container w-25">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="rating" className="form-label">
          Rating
        </label>
        <input
          type="range"
          name="rating"
          min="0"
          max="5"
          step="0.5"
          className="form-control"
          {...register("rating")}
        />

        <label htmlFor="body" className="form-label">
          Review
        </label>
        <textarea
          type="text"
          name="body"
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
  );
};

export default ReviewForm;
