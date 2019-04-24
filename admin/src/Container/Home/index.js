import React, { Component } from "react";
import { connect } from "react-redux";
class Home extends Component {
  componentDidMount() {
    this.toolbar(true);
    this.props.changeTitle();
    document.title = "Home";
  }
  toolbar = e => {
    const navBar = document.getElementById("toolbar");
    if (e) {
      navBar.classList.add("is-hidden");
    } else {
      navBar.classList.remove("is-hidden");
    }
  };
  componentWillUnmount() {
    this.toolbar(false);
  }
  state = {};
  render() {
    return <div>Hello world</div>;
  }
}
const mapStore = state => {
  return {
    browseTitle: state.browseTitle
  };
};
const mapDispatch = dispatch => {
  return {
    changeTitle: () => {
      dispatch({ type: "CHANGE_TITLE", browseTitle: "Home" });
    }
  };
};
export default connect(
  mapStore,
  mapDispatch
)(Home);
