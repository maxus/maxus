import React, { Component } from "react";
import "./style.css";
class Login extends Component {
  componentDidMount() {
    document.title = "Login -";
  }
  state = {};
  render() {
    return (
      <div className="login">
        <div className="main">
          <div className="main__">
            <div className="main_">
              <div id="footer">
                <button className>Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
