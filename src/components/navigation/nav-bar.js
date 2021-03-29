import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import AuthContext from "../Context/AuthContext";

const NavigationComponent = (props) => {
  const { loggedInStatus, permissions, handleSuccessfulLogout } = useContext(
    AuthContext
  );

  const renderNavBarLinks = () => {
    if (loggedInStatus === "LOGGED_IN" && permissions === "Admin") {
      return (
        <div className="nav-wrapper">
          <div className="nav-link-wrapper">
            <NavLink exact to="/clients">
              Home
            </NavLink>
          </div>
          <div className="nav-link-wrapper">
            <NavLink to="/add-client">Add Client</NavLink>
          </div>
          <div className="nav-link-wrapper">
            <NavLink to="/employee-manager">Employees</NavLink>
          </div>
          <div className="logout-button">
            <button onClick={handleSuccessfulLogout}>logout</button>
          </div>
        </div>
      );
    } else if (loggedInStatus === "LOGGED_IN") {
      return (
        <div className="nav-wrapper">
          <div className="nav-link-wrapper">
            <NavLink exact to="/clients">
              Home
            </NavLink>
            <div>
              <button onClick={handleSuccessfulLogout}>logout</button>
            </div>
          </div>
        </div>
      );
    } else{
      return<div></div>
    }
  };

  return <div>{renderNavBarLinks()}</div>;
};

export default withRouter(NavigationComponent);
