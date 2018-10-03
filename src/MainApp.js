import React from "react";
import App from "./App";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UpdateUser from "./UpdateUser";

const MainApp = () => {
  return (
    <Router>
      <div>
        <Route exact path="/">
          <App />
        </Route>
      </div>
    </Router>
  );
};

export default MainApp;
