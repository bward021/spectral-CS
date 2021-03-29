import axios from "axios";
import React, { useState, useEffect } from "react";
import { API_URL } from "../api_url/api-url"


import { Redirect, useHistory } from "react-router-dom";

import AuthContext from "../Context/AuthContext";

const AuthProvider = (props) => {
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN");
  const [permissions, setPermissions] = useState("")

  let history  = useHistory()

  useEffect(() => {
    axios({
      method: "get",
      url: `${API_URL}api/v1/logged-in`,
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.employees_permissions) {
          setLoggedInStatus("LOGGED_IN");
          setPermissions(response.data.employees_permissions)
          history.push("/clients")
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [history]);

  const handleSuccessfulLogout = () => {
    axios({
      method: "post",
      url: `${API_URL}api/v1/logout`,
      withCredentials: true,
    })
      .then(() => {
        setLoggedInStatus("NOT_LOGGED_IN");
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSuccessfulLogin = () => {
    setLoggedInStatus("LOGGED_IN");
    return <Redirect to="/clients" />;
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