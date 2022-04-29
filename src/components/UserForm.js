import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import useInput from "../hooks/useInput";
import axios from "axios";

const UserForm = (props) => {
  const context = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // the useInput hook returns two objects: inputs and touched
  // inputs: {username: "enteredValue", password: "enteredValue"}
  // touched: {username: false, password: false}
  const { inputHandler, blurHandler, reset, inputs, touched } = useInput();

  const validateUsername = (input) => input.trim() !== "";
  const validatePassword = (input) => input.trim() !== "";

  const usenameValid = inputs.username
    ? validateUsername(inputs.username)
    : false;
  const passwordValid = inputs.password
    ? validatePassword(inputs.password)
    : false;

  // if the username has been edited and is not valid, set it to invalid
  const usernameInvalid = !usenameValid && touched.username;
  const passwordInvalid = !passwordValid && touched.password;
  const formValid = usenameValid && passwordValid;

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!formValid) {
      return;
    }
    const res = await axios.post(location.pathname, inputs);
    if (res.data === "success") {
      navigate("/books");
      context.login(inputs.username);
    }
    reset();
  };

  return (
    <div className={""}>
      <form onSubmit={submitHandler} className={""}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          onChange={inputHandler}
          onBlur={blurHandler}
          value={inputs.username || ""}
        />
        <p>{usernameInvalid && "Username is not valid"}</p>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={inputHandler}
          onBlur={blurHandler}
          value={inputs.password || ""}
        />
        <p>{passwordInvalid && "Password is not valid"}</p>
        {<button type="submit">{location.pathname.slice(1)}</button>}
      </form>
    </div>
  );
};

export default UserForm;
