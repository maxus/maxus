import React, { Component } from "react";
import { connect } from "react-redux";
import "./style.css";
class Image extends Component {
  constructor(props) {
    super(props);
    this.uploadValue = React.createRef();
    this.state = {
      filePath: ""
    };
  }
  componentDidUpdate() {
    const type = this.props.poster ? "posterImage" : "bannerImage";
    this.props.handleValue(this.state.filePath, type);
  }
  componentWillReceiveProps(newProps) {
    const posterImage = newProps.posterImage;
    const bannerImage = newProps.bannerImage;
    if (this.props.poster) {
      this.setState({
        filePath: posterImage
      });
    } else {
      this.setState({
        filePath: bannerImage
      });
    }
  }
  fileChangedHandler = event => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      this.props.handleLoad(true);
      const formData = new FormData();
      formData.append("image", image);
      fetch("/api/image/upload", {
        method: "POST",
        body: formData
      })
        .then(response => response.json())
        .then(response => this.setState({ filePath: response.path }));
      this.props.handleLoad(false);
      //.then(err => console.log(err));
    } else {
      console.log("Something went wrong");
    }
  };
  render() {
    const { filePath } = this.state;
    const { title, poster } = this.props;
    return (
      <div id="image-upload">
        <div id="label">{title}</div>
        <div
          className={
            poster ? "poster-image-container" : "banner-image-container"
          }
          style={{
            backgroundImage: filePath ? `url(uploads/${filePath})` : "none"
          }}
        >
          <button
            className="poster-action-button pab-remove"
            style={{ display: filePath ? "block" : "none" }}
            onClick={_ => {
              this.props.handleLoad(true);
              const path = filePath;
              fetch("/api/image/remove/" + path)
                .then(response => response.json())
                .then(response =>
                  response.status ? this.setState({ filePath: "" }) : ""
                );
              this.uploadValue.current.value = "";
              this.props.handleLoad(false);
            }}
          >
            <i className="material-icons">clear</i>
          </button>
          <label id="upload" style={{ display: filePath ? "none" : "flex" }}>
            <i className="material-icons">add</i>
            <input
              type="file"
              onChange={this.fileChangedHandler}
              className="imgUpload"
              accept="image/*"
              ref={this.uploadValue}
              name="image"
            />
          </label>
        </div>
      </div>
    );
  }
}
const mapStore = state => {
  return {
    bannerImage: state.bannerImage,
    posterImage: state.posterImage
  };
};
const mapDispatchToProps = dispatch => {
  return {
    handleLoad: e => {
      dispatch({ type: "ON_CHANGE", data: { loading: e } });
    },
    handleValue: (value, name) => {
      dispatch({ type: "ON_CHANGE", data: { [name]: value } });
    }
  };
};
export default connect(
  mapStore,
  mapDispatchToProps
)(Image);
