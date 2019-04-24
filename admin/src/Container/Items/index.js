import React, { Component } from "react";
import { MDCMenuSurface } from "@material/menu-surface";
import { MDCRipple } from "@material/ripple";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import "./style.css";

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.menu = React.createRef();
  }
  componentDidMount() {}
  renderMenu = e => {
    const menu = new MDCMenuSurface(this.menu.current);
    this.menuRipple();
    if (e) {
      menu.setFixedPosition(true);
      menu.open = !menu.open;
    }
  };
  menuRipple = _ => {
    // Button Ripple
    const menu = [].slice.call(document.querySelectorAll(".mdc-list-item"));
    menu.forEach(menu => {
      new MDCRipple(menu);
    });
  };
  render() {
    const {
      dataKey,
      title,
      year,
      archived,
      image_url,
      url,
      description,
      date
    } = this.props;

    return (
      <div>
        <div id="content" className={archived ? "" : "is-active"}>
          <div id="poster">
            <img className="poster" src={image_url} alt={title} />
          </div>
          <div id="details">
            <div id="data-link">
              <Link is="action-link" id="link" tabindex="0" to={url}>
                {title}
                {year ? ` (${year})` : ``}
              </Link>
            </div>
            <div id="description">{description}</div>
            <div id="footer">
              <span>{date}</span>
            </div>
          </div>
          <div id="more-wrapper">
            <button
              className="paper-button mdc-icon-button"
              id="more"
              onClick={() => this.renderMenu(dataKey)}
            >
              <svg viewBox="0 0 24 24">
                <g>
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </g>
              </svg>
            </button>
            <div className="mdc-menu-surface--anchor">
              <div className="mdc-menu-surface" ref={this.menu}>
                <ul className="mdc-list" role="menu" aria-hidden="true">
                  <li
                    className="mdc-list-item"
                    role="menuitem"
                    tabIndex="-1"
                    onClick={() => this.props.edit(dataKey)}
                  >
                    <span className="mdc-list-item__text">Edit</span>
                  </li>
                  <li
                    className="mdc-list-item"
                    role="menuitem"
                    tabIndex="-1"
                    onClick={() => this.props.delete(dataKey, title)}
                  >
                    <span className="mdc-list-item__text">Delete</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatch = dispatch => {
  return {
    delete: (id, title) => dispatch({ type: "DELETE", id: id, title: title }),
    edit: id => dispatch({ type: "EDIT", id: id })
  };
};
export default connect(
  null,
  mapDispatch
)(Items);
