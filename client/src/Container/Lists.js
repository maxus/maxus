import React, { Component } from "react";
import Items from "./Items";
class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollLimit: 0,
      scrollLimitLow: 0,
      ScrollLimitLowest: 0,
      Limit: 0,
      right: 1,
      left: 1,
      position: "at-start"
    };
    this.Items = React.createRef();
  }
  componentDidMount() {
    document.title = "MAXUS";
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions = _ => {
    // 1304 transform:  translateX(0px);
    // 1090 transform: translateX(-214px);
    // 876 transform: translateX(-428px);
    // 662 transform: translateX(-642px);
    // 428 transform: translateX(-428px);
    let scrollLimiter, scrollLimitLowDev, scrollLimitSmall;
    if (window.innerWidth > 1304) {
      scrollLimiter = 0;
    } else if (window.innerWidth > 1090) {
      scrollLimiter = 214;
    } else if (window.innerWidth > 867) {
      scrollLimiter = 428;
    } else if (window.innerWidth > 662) {
      scrollLimiter = 642;
    } else if (window.innerWidth > 428) {
      scrollLimitLowDev = 428;
    } else {
      scrollLimitSmall = 330;
    }
    this.setState({
      scrollLimit: scrollLimiter,
      scrollLimitLow: scrollLimitLowDev,
      ScrollLimitLowest: scrollLimitSmall
    });
  };

  renderScroll = e => {
    switch (e) {
      case "left": {
        this.scrollLeft();
        break;
      }
      case "right": {
        this.scrollright();
        break;
      }

      default: {
        console.log(e);
      }
    }
  };
  scrollLeft = () => {
    const {
      scrollLimit,
      Limit,
      scrollLimitLow,
      ScrollLimitLowest
    } = this.state;
    if (scrollLimitLow) {
      if (Limit === 0) {
        this.setState({ position: "at-start" });
      } else {
        this.setState({ Limit: Limit - 428, position: "" });
      }
    } else if (ScrollLimitLowest) {
      if (Limit === 0) {
        this.setState({ position: "at-start" });
      } else {
        this.setState({ Limit: Limit - 338, position: "" });
      }
    } else {
      this.setState({
        Limit: scrollLimit - scrollLimit,
        position: "at-start"
      });
    }
  };
  scrollright = () => {
    const {
      scrollLimit,
      Limit,
      scrollLimitLow,
      ScrollLimitLowest
    } = this.state;
    if (scrollLimitLow) {
      if (Limit === 856) {
        this.setState({ position: "at-end" });
      } else {
        this.setState({
          Limit: Limit + 428,
          position: ""
        });
      }
    } else if (ScrollLimitLowest) {
      if (Limit === 676) {
        this.setState({ position: "at-end" });
      } else {
        this.setState({
          Limit: Limit + 338,
          position: ""
        });
      }
    } else {
      this.setState({
        Limit: scrollLimit,
        position: "at-end"
      });
    }
  };
  renderMovies = ({ id, title, image_url, runtime, date, type }) => (
    <Items
      key={id}
      link="/sda"
      title={title}
      type={type}
      thumbnail={image_url}
      date={date}
    />
  );
  render() {
    const { items } = this.props;
    return (
      <div className="shelf">
        <div className="shelf-render">
          <div className="shelf-subheader">
            {/* shelf.props.subheader */}
            <span className="title">{this.props.title}</span>
            <div className="shelf-contents">
              <div className="shelf-list-render" position={this.state.position}>
                <div id="left-arrow" className="horizontal-renderer">
                  <button
                    className="mdc-fab material-icons dev-fab"
                    onClick={_ => {
                      this.renderScroll("left");
                    }}
                    hidden={this.state.Limit === 0 ? true : false}
                  >
                    keyboard_arrow_left
                  </button>
                </div>
                <div className="shelf-scroll-lock">
                  <div
                    id="items"
                    style={{
                      transform: `translateX(-${this.state.Limit}px)`
                    }}
                    ref={this.Items}
                  >
                    {/* items.props.* */}
                    {items.map(this.renderMovies)}
                  </div>
                </div>
                <div id="right-arrow" className="horizontal-renderer">
                  <button
                    className="mdc-fab material-icons dev-fab"
                    onClick={_ => {
                      this.renderScroll("right");
                    }}
                    hidden={this.state.Limit >= 676 ? true : false}
                  >
                    keyboard_arrow_right
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Lists;
