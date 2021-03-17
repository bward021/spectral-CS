import React, { useState } from "react";

import LoginImage from "../assets/images/Spectral.PNG"

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-page-container">
      <div className="login-page-wrapper">
        <div className="login-left-column" 
          style={{
            backgroundImage: `url(${LoginImage})`
          }}
        > . </div>
        <div className="login-right-column">
          <form className="login-form">
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
