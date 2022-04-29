import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BookForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { title, image, price, link, description } = location.state || {};
  const [form, setForm] = useState({ title, image, price, link, description });

  const inputHandler = (event) => {
    setForm((form) => ({
      ...form,
      [event.target.name]: event.target.value,
    }));
  };

  //const formValid = form.body.trim() === "";
  const submitHandler = async (event) => {
    event.preventDefault();
    // if (form.title.trim() === "") {
    //   return;
    // }
    // let res;
    // if (location.state) {
    //   res = await axios.put(location.pathname, { book: form });
    // } else {
    //   res = await axios.post('/books', { book: form });
    // }

    let res = await axios.post(location.pathname, { book: form });
    if (res.status === 200) {
      navigate(-1);
    }
    setForm({});
  };

  return (
    <div className={""}>
      <form onSubmit={submitHandler} className={""}>
        <label htmlFor="title">Book Name</label>
        <input
          type="text"
          name="title"
          onChange={inputHandler}
          value={form.title || ""}
        />
        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          onChange={inputHandler}
          value={form.author || ""}
        />
        <label htmlFor="image">Image URL</label>
        <input
          type="image"
          name="image"
          onChange={inputHandler}
          value={form.image || ""}
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          onChange={inputHandler}
          value={form.price || ""}
        />
        <label htmlFor="link">Link to purchase</label>
        <input
          type="url"
          name="link"
          onChange={inputHandler}
          value={form.link || ""}
        />
        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          name="description"
          onChange={inputHandler}
          value={form.description || ""}
        />
        {/* <p className={styles.error}>
          {reviewInvalid && "Review cannot be empty!"}
        </p> */}
        {<button type="submit">Submit</button>}
      </form>
    </div>
  );
};

export default BookForm;
