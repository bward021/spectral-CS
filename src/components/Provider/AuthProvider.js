import axios from "axios";
import React, { useState, useEffect } from "react";

import { Redirect } from "react-router-dom";

import AuthContext from "../Context/AuthContext";

const AuthProvider = (props) => {
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN");
  const [permissions, setPermissions] = useState("")

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/v1/logged-in`,
      withCredentials: true,
    })
      .then((response) => {
        console.log(response);
        if (response.data === "User logged in via cookie") {
          setLoggedInStatus("LOGGED_IN");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSuccessfulLogout = () => {
    console.log("logout");
    axios({
      method: "post",
      url: `http://localhost:5000/api/v1/logout`,
      withCredentials: true,
    })
      .then(() => {
        setLoggedInStatus("NOT_LOGGED_IN");
        <Redirect to="/" />;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSuccessfulLogin = () => {
    console.log("handleLogin");
    setLoggedInStatus("LOGGED_IN");
    return <Redirect to="/" />;
  };

  const state = {
    loggedInStatus,
    setLoggedInStatus,
    permissions,
    setPermissions,
    handleSuccessfulLogin,
    handleSuccessfulLogout,
  };

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;