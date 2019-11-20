import React from 'react';
import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home"
import LandingPage "./Components/GettingStarted.js"

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={}></Route>
        </Switch>
      </Router>

    );
  }
}

export default App;