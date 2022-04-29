import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ReviewForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { rating = 0, body = "" } = location.state || {};
  const [form, setForm] = useState({ rating, body });

  const inputHandler = (event) => {
    setForm((form) => ({
      ...form,
      [event.target.name]: event.target.value,
    }));
  };

  //const formValid = form.body.trim() === "";

  const submitHandler = async (event) => {
    event.preventDefault();
    if (form.body.trim() === "") {
      return;
    }
    let res;
    if (location.state) {
      res = await axios.put(location.pathname, { review: form });
    } else {
      res = await axios.post(location.pathname, { review: form });
    }
    if (res.status === 200) {
      navigate(-1);
    }
    setForm({});
  };

  return (
    <div className={""}>
      <form
        // onBlur={blurHandler}
        onSubmit={submitHandler}
        className={""}
      >
        <label htmlFor="rating">Rating</label>
        <input
          type="range"
          name="rating"
          min="0"
          max="5"
          step="0.5"
          onChange={inputHandler}
          value={form.rating || "0"}
        />
        <label htmlFor="body">Review</label>
        <textarea
          type="text"
          name="body"
          onChange={inputHandler}
          value={form.body || ""}
        />
        {/* <p className={styles.error}>
          {reviewInvalid && "Review cannot be empty!"}
        </p> */}
        {<button type="submit">Submit</button>}
      </form>
    </div>
  );
};

export default ReviewForm;
