import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";

const NavigationComponent = (props) => {

  return (
    <div className="nav-wrapper">
      <div className="nav-link-wrapper">
        <NavLink exact to="/clients">
          Home
        </NavLink>
      </div>
      <div className="nav-link-wrapper">
        <NavLink to="/add-client" >
          Add Client
        </NavLink>
      </div>
      <div className="nav-link-wrapper">
        <NavLink to="/employee-manager">
          Employees
        </NavLink>
      </div>
    </div>
  );
};

export default withRouter(NavigationComponent);
