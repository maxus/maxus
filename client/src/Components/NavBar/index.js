import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCRipple } from "@material/ripple";
import { MDCDrawer } from "@material/drawer";
import "./style.css";
class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      searchClass: false,
      searchValue: ""
    };
  }

  componentDidMount() {
    // Navbar
    new MDCTopAppBar(document.querySelector(".mdc-top-app-bar"));

    this.renderRipple();
    const list = document.querySelector(".nav-list-items");
    const drawerTrigger = document.querySelector(".header-menu-button");
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

    // FAB Button Ripple
    const FabButtonRipple = [].slice.call(
      document.querySelectorAll(".mdc-fab")
    );
    FabButtonRipple.forEach(FabButtonRipple => {
      new MDCRipple(FabButtonRipple);
    });
  };
  toggleSearch = e => {
    const NavBar = document.querySelector(".mdc-top-app-bar");
    if (e) {
      if (NavBar.classList.contains("is-open")) {
        NavBar.classList.remove("is-open");
      } else {
        NavBar.classList.add("is-open");
        document.querySelector("#search-input").focus();
      }
    }
  };
  render() {
    const { searchValue } = this.state;
    return (
      <div>
        <header className="mdc-top-app-bar mdc-top-app-bar--fixed dev-nav">
          <div className="mdc-top-app-bar__row">
            <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
              <button className="material-icons mdc-top-app-bar__navigation-icon header-menu-button">
                menu
              </button>
              <Link to="/" className="dev-title">
                <span className="mdc-top-app-bar__title">Maxus</span>
              </Link>
            </section>

            <section
              className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end"
              role="toolbar"
            >
              <NavLink exact to="/" className="nav-links">
                Нүүр
              </NavLink>
              <NavLink to="/animes" className="nav-links">
                Анимэ
              </NavLink>
              <NavLink to="/movies" className="nav-links">
                Кино
              </NavLink>
              <NavLink to="/series" className="nav-links">
                Цуврал
              </NavLink>
              <form
                id="search-form"
                className="search-form"
                onSubmit={e => {
                  e.preventDefault();
                  console.log(searchValue);
                  //document.location(`/search?${searchValue});
                }}
              >
                <input
                  id="search-input"
                  className="search-form__input"
                  type="text"
                  placeholder="Search"
                  autoComplete="off"
                  onChange={e => {
                    this.setState({
                      searchValue: { searchValue: e.target.value }
                    });
                  }}
                />
              </form>
              <button
                className="mdc-icon-button nav-search"
                onClick={() => {
                  this.toggleSearch(true);
                }}
              >
                <i className="material-icons header__spyglass">search</i>
                <i className="material-icons header__search-close">close</i>
              </button>
            </section>
          </div>
        </header>

        <div>
          <aside className="mdc-drawer mdc-drawer--modal dev-drawer">
            <div className="dev-drawer-header">
              <div className="header-contianer">
                <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                  <button className="mdc-icon-button material-icons">
                    menu
                  </button>
                  <a className="dev-title" href="/">
                    <span className="mdc-top-app-bar__title">Maxus</span>
                  </a>
                </section>
              </div>
            </div>
            <div className="mdc-drawer__content">
              <nav className="nav-list-items">
                <ul>
                  <li>
                    <NavLink exact to="/" className="nav-panel-link">
                      <i className="material-icons">home</i>
                      <span>Нүүр</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/animes" className="nav-panel-link">
                      <i className="material-icons">favorite</i>
                      <span>Анимэ</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/movies" className="nav-panel-link">
                      <i className="material-icons">movies</i>
                      <span>Кино</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about" className="nav-panel-link">
                      <i className="material-icons">list</i>
                      <span>Цуврал</span>
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
          <div className="mdc-drawer-scrim" />
        </div>
      </div>
    );
  }
}

export default NavBar;
