import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Clients from "./components/pages/clients";
import Login from "./components/pages/login";
import ClientPortal from "./components/pages/client-portal";
import Data from "./components/pages/data";
import NavigationComponent from "./components/navigation/nav-bar";
import AddClient from "./components/pages/add-client";
import AddClientTrial from "./components/pages/add-client-trial";
import EmployeeManager from "./components/pages/employee-manager";
import AuthContext from "./components/Context/AuthContext";

function App() {
  const { loggedInStatus, permissions } = useContext(AuthContext);

  const renderRoutes = () => {
    if (loggedInStatus === "LOGGED_IN" && permissions === "Admin") {
      return (
        <div>
          <Route exact path="/clients">
            <Clients />
          </Route>
          <Route path="/clients/:slug">
            <ClientPortal />
          </Route>
          <Route path="/data/:slug">
            <Data />
          </Route>
          <Route path="/add-client">
            <AddClient />
          </Route>
          <Route path="/add-client-trial/:slug">
            <AddClientTrial />
          </Route>
          <Route path="/employee-manager">
            <EmployeeManager />
          </Route>
        </div>
      );
    } else if (loggedInStatus === "LOGGED_IN") {
      return (
        <div>
          <Route exact path="/clients">
            <Clients />
          </Route>
          <Route path="/clients/:slug">
            <ClientPortal />
          </Route>
          <Route path="/data/:slug">
            <Data />
          </Route>
        </div>
      );
    }
  };

  return (
    <div className="App">
      <NavigationComponent />
      <div>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          {renderRoutes()}
        </Switch>
      </div>
    </div>
  );
}

export default App;
