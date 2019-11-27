import React from 'react';
import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home"
import Explore from './Components/Explore';
import Messages from './Components/Messages';
import List from './Components/MyList';
import ListSpecific from './Components/ListSpecific';
import ListInfo from './Components/ListInfo';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/Explore" component={Explore}></Route>
          <Route path="/List" component={List}></Route>
          <Route path="/ListSpecific" component={ListSpecific}></Route>
          <Route path="/ListInfo" component={ListInfo}></Route>
          <Route path="/Messages" component={Messages}></Route>
        </Switch>
      </Router>

    );
  }
}

export default App;