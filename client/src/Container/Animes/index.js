import React, { Component } from "react";
import "./style.css";
class Animes extends Component {
  componentDidMount() {
    document.title = "Maxus - Anime";
  }
  state = {};
  render() {
    return (
      <div>
        <span>Anime</span>
      </div>
    );
  }
}

export default Animes;
