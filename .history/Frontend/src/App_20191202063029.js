import React from 'react';
import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home"
import Signup from "./Components/LandingPage/Signup"
import LandingPage from './Components/LandingPage/LandingPage'
import Explore from './Components/Explore';
import Messages from './Components/Messages';
import UserProfile from './Components/UserProfile/UserProfile'
import Deactivate from './Components/DeactivateAccount';
import Delete from './Components/DeleteAccount'
import Followers from './Components/UserProfile/Followers'
import Following from './Components/UserProfile/Following'

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
          <Route exact path="/profile/:username" component={UserProfile}></Route>
          <Route exact path="/deactivate" component={Deactivate}></Route>
          <Route exact path="/delete" component={Delete}></Route>
          <Route exact path="/follow" component={Follow}></Route>
          <Route exact path="/follow" component={Follow}></Route>
        </Switch>
      </Router>

    );
  }
}

export default App;