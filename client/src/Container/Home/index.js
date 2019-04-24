import React, { Component } from "react";

import Lists from "../Lists";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home: [],
      movies: [],
      animes: [],
      series: []
    };
  }
  componentDidMount() {
    document.title = "MAXUS - Home";
    this.getData();
  }
  componentWillUnmount() {
    console.log("Home unmounted");
  }
  getData = _ => {
    fetch("/api/home")
      .then(response => response.json())
      .then(response => this.setState({ movies: response.movie }))
      .catch(err => console.error(err));
  };

  render() {
    const { movies } = this.state;
    return (
      <div>
        <Lists title="Latest - Mixed by MAXUS" items={movies} />
        {/* <Lists title="Movies" /> */}
      </div>
    );
  }
}

export default Home;
