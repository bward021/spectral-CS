import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Clients from "./components/pages/clients";
import Login from "./components/pages/login";
import ClientPortal from "./components/pages/client-portal";
import Data from "./components/pages/data";
import NavigationComponent from "./components/navigation/nav-bar"
import AddClient from "./components/pages/add-client";
import AddClientTrial from "./components/pages/add-client-trial";
import EmployeeManager from "./components/pages/employee-manager";

function App() {
  const [loggedIn, setLoggedIn] = useState("");
  const [permissions, setPermissions] = useState("");

  return (
    <div className="App">
        <NavigationComponent />
        <div>
          <Switch>
            <Route exact path="/">
              <Login
                setLoggedIn={setLoggedIn}
                setPermissions={setPermissions}
              />
            </Route>

            <Route exact path="/clients">
              <Clients loggedIn={loggedIn} permissions={permissions} />
            </Route>
            <Route path="/clients/:slug">
              <ClientPortal loggedIn={loggedIn} permissions={permissions} />
            </Route>
            <Route path="/data/:slug">
              <Data loggedIn={loggedIn} permissions={permissions} />
            </Route>
            <Route path="/add-client">
              <AddClient loggedIn={loggedIn} permissions={permissions} />
            </Route>
            <Route path="/add-client-trial/:slug">
              <AddClientTrial loggedIn={loggedIn} permissions={permissions} />
            </Route>
            <Route path="/employee-manager">
              <EmployeeManager loggedIn={loggedIn} permissions={permissions} />
            </Route>
          </Switch>
        </div>
    </div>
  );
}

export default App;
