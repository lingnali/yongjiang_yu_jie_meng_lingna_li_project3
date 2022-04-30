import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

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

  const onSubmit = async (data, e) => {
    let res;
    if (location.state) {
      res = await axios.put(`/books/${_id}`, { book: data });
      if (res.status === 200) {
        navigate(`/books/${_id}`);
      }
    } else {
      res = await axios.post("/books", { book: data });
      if (res.status === 200) {
        navigate(-1);
      }
    }
    reset();
  };

  return (
    <div className="container w-25">
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <label htmlFor="image" className="form-label">
          Image URL
        </label>
        <input
          name="image"
          type="text"
          className="form-control"
          {...register("image", {
            required: "Title cannot be empty",
          })}
        />
        <p className="text-danger">{errors.image?.message}</p>
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          type="number"
          name="price"
          className="form-control"
          {...register("price", {
            required: "Price cannot be empty",
            min: { value: 0, message: "Price cannot be negative" },
          })}
        />
        <p className="text-danger">{errors.price?.message}</p>
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          type="text"
          name="description"
          className="form-control"
          {...register("description", {
            required: "Description cannot be empty",
          })}
        />
        <p className="text-danger">{errors.description?.message}</p>
        {<button type="submit">Submit</button>}
      </form>
    </div>
  );
};

export default BookForm;
