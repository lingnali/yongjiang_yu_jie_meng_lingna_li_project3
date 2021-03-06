import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthContext from "../contexts/AuthContext";
import axios from "axios";
import Error from "./Error";

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

  let err = null;
  const onSubmit = async (data, e) => {
    const res = await axios.post(`/api/${location.pathname}`, data);
    if (res.status === 200) {
      navigate("/books");
      context.login(data.username);
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
            <div className="col-sm-7 col-md-5 col-lg-3">
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
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary text-uppercase"
                  >
                    {location.pathname.slice(1)}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserForm;
