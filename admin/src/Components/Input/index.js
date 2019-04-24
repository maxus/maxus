import React, { Component } from "react";
import { connect } from "react-redux";
import "./style.css";
class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: "false",
      value: props.value
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.handleValue(event.target.value, event.target.name);
  }
  renderFocus = e => {
    if (e) {
      this.setState({ focus: "true" });
    } else {
      this.setState({ focus: "false" });
    }
  };
  componentWillReceiveProps(newProps) {
    this.setState({ value: newProps.value });
  }
  render() {
    const { label, autofocus, input, name, type } = this.props;
    const { focus, value } = this.state;
    return (
      <div className="dialog-input" focused={focus}>
        <div id="label">{label}</div>
        <div id="row-container">
          <div id="input-container">
            <div id="inner-input-container">
              {input ? (
                <input
                  id="input"
                  name={name}
                  value={value}
                  type={type}
                  autoFocus={autofocus}
                  autoComplete="off"
                  onBlur={_ => {
                    this.renderFocus(false);
                  }}
                  onFocus={_ => {
                    this.renderFocus(true);
                  }}
                  onChange={this.handleChange}
                />
              ) : (
                <textarea
                  id="input"
                  type={type}
                  name={name}
                  value={value}
                  rows="3"
                  onBlur={_ => {
                    this.renderFocus(false);
                  }}
                  onFocus={_ => {
                    this.renderFocus(true);
                  }}
                  onChange={this.handleChange}
                />
              )}
            </div>
            <div id="underline" />
          </div>
        </div>
      </div>
    );
  }
}
const mapStore = (state, ownProps) => {
  const name = ownProps.name;
  return {
    value: state[name]
  };
};
const mapDispatchToProps = dispatch => {
  return {
    handleValue: (value, name) => {
      dispatch({ type: "ON_CHANGE", data: { [name]: value } });
    }
  };
};
export default connect(
  mapStore,
  mapDispatchToProps
)(Input);
