import React, { useState, useContext } from "react";
import axios from "axios"
import { useHistory } from "react-router-dom"
import { API_URL } from "../api_url/api-url"


import AuthContext from "../Context/AuthContext";
import LoginImage from "../../assets/images/Spectral.PNG"

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { handleSuccessfulLogin, setPermissions } = useContext(AuthContext);

  let history = useHistory()

  const handleSubmit = (e) => {
    axios({
        method: "post",
        url: `${API_URL}login`,
        data: {
            username: {username},
            password: {password},
          },
          withCredentials: true
        })
      .then((response) => {
        console.log(response)
        if (response.data.id || response.data.id === 1) {
          handleSuccessfulLogin()
          setPermissions(response.data.permissions)
          history.push("/clients")
        }
      })
      .catch((error) => {
        console.log("Some error occured", error);
      });
    e.preventDefault();
  }

  return (
    <div className="login-page-container">
      <div className="login-page-wrapper">
        <div className="login-left-column" 
          style={{
            backgroundImage: `url(${LoginImage})`
          }}
        > . </div>
        <div className="login-right-column">
          <form className="login-form" onSubmit={(e)=>{handleSubmit(e)}}>
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="Email"
              />
            </div>
            <div>
              <input
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
              />
            </div>
            <div>
            <button>Sign In</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
