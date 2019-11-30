import React from 'react';
import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home"
import Explore from './Components/Explore';
import TweetDisplay from './Components/TweetDisplay';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/Explore" component={Explore}></Route>
          <Route path = '/tweet/:tweetId' component ={TweetDisplay}></Route>
        </Switch>
      </Router>

    );
  }
}

export default App;