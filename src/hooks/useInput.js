import { useState } from "react";

const useInput = () => {
  const [inputs, setInputs] = useState({});
  const [touched, setTouched] = useState({});

  const inputHandler = (event) => {
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };
  const blurHandler = (event) => {
    setTouched((touched) => ({
      ...touched,
      [event.target.name]: true,
    }));
  };

  const reset = () => {
    setInputs({});
    setTouched({});
  };

  return {
    setInputs,
    inputHandler,
    blurHandler,
    reset,
    inputs,
    touched,
  };
};

export default useInput;
