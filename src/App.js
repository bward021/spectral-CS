import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login";


function App() {
  return (
    <div className="App">
      <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Login} />
            </Switch>
          </div>
        </Router>
    </div>
  );
}

export default App;
