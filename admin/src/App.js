import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { NavBar } from "./Components";
import { Home, Login, Movies, Animes } from "./Container";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <div id="container">
            <div id="main">
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/movies" component={Movies} />
              <Route path="/animes" component={Animes} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
