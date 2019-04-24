import React, { Component } from "react";
import { MDCRipple } from "@material/ripple";
import { MDCDrawer } from "@material/drawer";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
//import { Link } from "react-router-dom";
import "./style.css";
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      searchOpen: false
    };
  }
  componentDidMount() {
    this.renderRipple();

    const list = document.querySelector(".settings-menu");
    const drawerTrigger = document.querySelector("#drawerTrigger");
    const drawer = MDCDrawer.attachTo(document.querySelector(".mdc-drawer"));

    drawerTrigger.addEventListener("click", e => {
      drawer.open = true;
    });
    list.addEventListener("click", event => {
      drawer.open = false;
    });
  }
  renderRipple = () => {
    // Icon Button Ripple
    const iconButtonRipple = [].slice.call(
      document.querySelectorAll(".mdc-icon-button")
    );
    iconButtonRipple.forEach(iconButtonRipple => {
      new MDCRipple(iconButtonRipple).unbounded = true;
    });

    // Button Ripple
    const buttonRipple = [].slice.call(
      document.querySelectorAll(".mdc-button")
    );
    buttonRipple.forEach(buttonRipple => {
      new MDCRipple(buttonRipple);
    });
  };
  toggleSearch = e => {
    const NavBar = document.getElementById("toolbar");
    if (e) {
      if (NavBar.classList.contains("search-open")) {
        NavBar.classList.remove("search-open");
      } else {
        NavBar.classList.add("search-open");
        document.querySelector("#searchInput").focus();
      }
    }
  };
  render() {
    const {browseTitle}=this.props;
    return (
      
      <div>
        <div
          id="toolbar"
          className={this.state.searchOpen ? "search-open" : ""}
          hastext={this.state.searchValue ? "true" : "false"}
        >
          <div id="main-toolbar">
            <div id="leftContent">
              <div id="leftSpacer">
                <div
                  id="menuButtonContainer"
                  className="paper-icon-button-light icon-menu-white"
                >
                  <button
                    className="paper-button mdc-icon-button"
                    id="drawerTrigger"
                  />
                </div>
                <h1>{browseTitle}</h1>
              </div>
            </div>
            <div id="centeredContent">
              <div
                id="search"
                onClick={() => {
                  document.querySelector("#searchInput").focus();
                }}
              >
                <button
                  className="mdc-icon-button paper-icon-button search-button"
                  onClick={() => {
                    this.toggleSearch(true);
                  }}
                >
                  <div className="icon">
                    <svg viewBox="0 0 24 24" focusable="false">
                      <g>
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                      </g>
                    </svg>
                  </div>
                </button>
                <div id="searchTerm">
                  <input
                    id="searchInput"
                    type="search"
                    autoFocus={true}
                    spellCheck="false"
                    placeholder={`Search ${browseTitle ? browseTitle.toLowerCase():""}`}
                    value={this.state.searchValue}
                    onChange={e => {
                      this.setState({
                        searchValue: e.target.value
                      });
                      this.props.search(e.target.value);
                    }}
                    onKeyUp={e => {}}
                    onBlur={() => {
                      this.toggleSearch(true);
                    }}
                  />
                </div>
                <div
                  id="cancelButtonContainer"
                  className="paper-icon-button-light icon-search-toolbar"
                  style={{ display: this.state.searchValue ? "block" : "none" }}
                >
                  <button
                    className="paper-button mdc-icon-button"
                    onClick={() => {
                      this.setState({ searchValue: "", searchOpen: true });
                      this.props.search("");
                      document.querySelector("#searchInput").focus();
                    }}
                  />
                </div>
              </div>
            </div>
            <div id="rightContent">
            <div id="moreActionsContainer">
                  <button
                    className="paper-button mdc-icon-button"
                  >
                   <div className="icon">
                   <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"><g><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g></svg>
                  </div>
                  </button>
                </div>
            </div>
          </div>
        </div>
        <div id="drawer">
          <aside className="mdc-drawer mdc-drawer--modal dev-drawer">
            <div className="drawer-header">Settings</div>
            <div className="settings-menu">
              <NavLink exact to="/">
                Home
              </NavLink>
              <NavLink to="/movies">Movies</NavLink>
              <NavLink to="/animes">Animes</NavLink>
              <NavLink to="/series">Series</NavLink>
              <div id="menuSeparator" />
              <NavLink to="/Logout">Logout</NavLink>
            </div>
          </aside>
          <div className="mdc-drawer-scrim" />
        </div>
      </div>
    );
  }
}
const mapStore = state => {
  return {
    browseTitle: state.browseTitle
  };
};
const mapDispatch = dispatch => {
  return {
    search: e => dispatch({ type: "SEARCH", search: e })
  };
};
export default connect(
  mapStore,
  mapDispatch
)(NavBar);
