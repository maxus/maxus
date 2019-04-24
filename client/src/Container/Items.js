import React, { Component } from "react";
import { Link } from "react-router-dom";
class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { thumbnail, link, title, type } = this.props;
    return (
      <div className="item">
        <div>
          <div className="thumbnail">
            <Link to={link}>
              <img src={thumbnail} id="img" alt={title} />
            </Link>
          </div>
          <div className="details">
            <Link to={link} className="link">
              <h3>{title}</h3>
              <div className="metadata">
                <span className="meta__type">{type}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Items;
