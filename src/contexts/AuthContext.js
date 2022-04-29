import React, { useState } from "react";

const AuthContext = React.createContext({
  username: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setLogin] = useState(false);
  const [username, setUsername] = useState("");

  const contextValue = {
    isLoggedIn: isLoggedIn,
    username: username,
    login: (username) => {
      setLogin(true);
      setUsername(username);
    },
    logout: () => {
      setLogin(false);
      setUsername("");
    },
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
