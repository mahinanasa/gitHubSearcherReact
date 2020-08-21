import React, {  FunctionComponent } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.scss';
import SearchForm from "../search/index";
const Routes: FunctionComponent = () => {
  return (
    <Router>
            {/* <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/home">About</Link>
          </li>
          <li>
            <Link to="/SearchForm">SearchForm</Link>
          </li>
        </ul>
        <hr />
        </div> */}

      <Switch>
      <Route exact path="/" component={SearchForm} />
      {/* <Route exact path="/home" component={HomePage} />
      <Route exact path="/SearchForm" component={SearchForm} /> */}
      </Switch>
    </Router>
  )
}

export default Routes;
