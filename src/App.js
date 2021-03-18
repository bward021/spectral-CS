import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Clients from './components/pages/clients';
import Login from "./components/pages/login";


function App() {

  const [loggedIn, setLoggedIn] = useState("");



  return (
    <div className="App">
      <Router>
          <div>
            <Switch>
            <Route
                exact
                path="/"
                render={(props) => (
                  <Login {...props} setLoggedIn={setLoggedIn} />
                )}
              />
              <Route 
                path="/clients" 
                render={(props) => (
                  <Clients {...props} loggedIn={loggedIn} />
                )}
              />
            </Switch>
          </div>
        </Router>
    </div>
  );
}

export default App;
