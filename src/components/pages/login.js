import React, { useState } from "react";
import axios from "axios"

import LoginImage from "../../assets/images/Spectral.PNG"

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    axios
      .post(
        "http://127.0.0.1:5000/login",
        {
            username: {username},
            password: {password},
          },
      )
      .then((response) => {
        if (response.data.Employees_id || response.data.Employees_id === "1") {
          props.setLoggedIn("loggedin")
          props.history.push("/clients")
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
                placeholder="Username"
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
