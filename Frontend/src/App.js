import React from 'react';
import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home"
import Explore from './Components/Explore';
import Messages from './Components/Messages';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/Explore" component={Explore}></Route>
          <Route path="/Messages" component={Messages}></Route>
        </Switch>
      </Router>

    );
  }
}

export default App;