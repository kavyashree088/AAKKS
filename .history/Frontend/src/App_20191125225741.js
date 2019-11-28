import React from 'react';
import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home"
import Signup from "./Components/LandingPage/Signup"
import LandingPage from './Components/LandingPage/LandingPage'
import Explore from './Components/Explore';
import Messages from './Components/Messages';
import UserProfile from './Components/UserProfile/UserProfile'
import MoreOptions from './Components/MoreOptions';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/home" component={Home}></Route>
          <Route exact path="/Signup" component={Signup}></Route>
          <Route exact path="/Explore" component={Explore}></Route>
          <Route exact path="/Messages" component={Messages}></Route>
          <Route exact path="/profile" component={UserProfile}></Route>
          <Route exact path="/MoreOptions" component={MoreOptions}></Route>

        </Switch>
      </Router>

    );
  }
}

export default App;