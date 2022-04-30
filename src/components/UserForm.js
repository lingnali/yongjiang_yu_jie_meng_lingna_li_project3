import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthContext from "../contexts/AuthContext";
import axios from "axios";

const UserForm = () => {
  const context = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { username: "", password: "" } });

  const onSubmit = async (data, e) => {
    const res = await axios.post(location.pathname, data);
    if (res.data === "success") {
      navigate("/books");
      context.login(data.username);
    }
    reset();
  };

  return (
    <div className="container w-25">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          name="username"
          className="form-control"
          {...register("username", {
            required: "Username is required",
            minLength: { value: 4, message: "Min length is 3" },
          })}
        />
        <p className="text-danger">{errors.username?.message}</p>
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="form-control"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 4, message: "Min length is 5" },
          })}
        />
        <p className="text-danger">{errors.password?.message}</p>
        <div class="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary text-uppercase">
            {location.pathname.slice(1)}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
