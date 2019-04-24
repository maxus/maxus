import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { NavBar } from "./Components";

import { Home, Animes, Search } from "./Container";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <div id="content">
            <div id="content-browse">
              <div className="browse-render">
                <Route exact path="/" component={Home} />
                <Route path="/animes" component={Animes} />

                <Route path="/search" component={Search} />
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
