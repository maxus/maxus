import React, { Component } from "react";
import { connect } from "react-redux";
import Items from "../Items";
import { MDCSnackbar } from "@material/snackbar";
import moment from "moment";
//import Dialog from "../Dialog";
// import { MDCTextField } from "@material/textfield";
import { MDCRipple } from "@material/ripple";
import { MDCDialog } from "@material/dialog";
import Input from "../../Components/Input";
import Image from "../../Components/Image";
import Genres from "../../Components/Genres";
import "./style.css";
class Movies extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      movies: [],
      disabled: true,
      edit: null
    };
  }
  componentDidMount() {
    //this.props.changeTitle();
    this.props.resetValue("Movies");
    document.title = "MAXUS - Movies";
    // TODO:
    // 0 get movies limit 10
    // 1 on scrolled to bottom get items movies ++10
    this.getData();
    this.renderRipple();

    const dialogElement = document.querySelector(".mdc-dialog");
    const dialog = new MDCDialog(dialogElement);

    document.querySelector("#addMovie").onclick = () => {
      this.props.resetValue("Movies");
      this.setState({ edit: null });
      dialog.open();
    };

    dialog.scrimClickAction = "";
    dialog.escapeKeyAction = "";

    dialogElement.querySelector("#save").onclick = () => {
      this.props.handleLoad(true); //LOAD
      this.handleSubmit();
    };
  }
  componentWillReceiveProps(newProps, prevProps) {
    this.validate(newProps, prevProps);
    if (newProps.delete.id && newProps.delete.id !== "") {
      this.delete(newProps.delete);
    }
    if (newProps.edit && newProps.edit !== 0) {
      this.edit(newProps.edit);
    }
  }
  edit = id => {
    this.props.handleLoad(true);
    fetch(`/api/movie/${id}`)
      .then(response => response.json())
      .then(response => {
        if (response.result[0]) {
          const {
            _id,
            title,
            description,
            link,
            year,
            keyword,
            posterImage,
            bannerImage,
            genre
          } = response.result[0];
          const data = {
            _id: _id,
            title: title,
            description: description,
            link: link,
            year: year,
            keyword: keyword,
            posterImage: posterImage,
            bannerImage: bannerImage,
            genre: genre
          };
          //Set update target id
          this.setState({ edit: _id });
          this.props.editValue(data);
          //Handle Load
          this.props.handleLoad(false);
          //Dialog
          const dialogElement = document.querySelector(".mdc-dialog");
          const dialog = new MDCDialog(dialogElement);
          dialog.scrimClickAction = "";
          dialog.escapeKeyAction = "";
          dialog.open();
        }
      });
  };
  delete = _ => {
    const dialogElement = document.querySelector("#remove");
    const dialog = new MDCDialog(dialogElement);
    dialog.scrimClickAction = "";
    dialog.escapeKeyAction = "";
    dialog.open();
  };
  validate = n => {
    if (
      n.title &&
      n.description &&
      n.keyword &&
      n.posterImage &&
      n.bannerImage &&
      n.genre.length !== 0
    ) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };
  handleSubmit = () => {
    const {
      title,
      description,
      year,
      keyword,
      link,
      posterImage,
      bannerImage,
      genre
    } = this.props;
    const data = {
      _id: this.state.edit,
      title: title,
      description: description,
      year: year,
      keyword: keyword,
      link: link,
      posterImage: posterImage,
      bannerImage: bannerImage,
      genre: genre
    };
    console.log(data);
    let type = this.state.edit ? "update" : "add";
    fetch(`/api/movie/${type}`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
        if (response.status) {
          this.getData();
          this.submited(response.status, response.msg);
        } else {
          this.submited(false);
        }
      });
    // .then(err => console.log(err));
  };
  submited = (status, msg) => {
    if (status) {
      //snackbar Setup
      const snackbar = new MDCSnackbar(document.querySelector(".mdc-snackbar"));
      snackbar.labelText = msg;
      snackbar.open();
      //Force Dialog close
      const element = document.getElementById("dialog");
      element.classList.remove("mdc-dialog--open");
      document.body.classList.remove("mdc-dialog-scroll-lock");
      this.props.resetValue("Movies"); // Reset Redux Data
    } else {
      console.warn("sda");
    }
  };
  getData = _ => {
    fetch("/api/movie")
      .then(response => response.json())
      .then(response => this.setState({ movies: response }))
      .then(response => this.renderRipple())
      .catch(err => console.error(err));
  };
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
  renderMovies = ({
    _id,
    title,
    description,
    year,
    posterImage,
    bannerImage,
    date,
    type
  }) => (
    <Items
      key={_id}
      url="/sda"
      title={title}
      year={year}
      type={type}
      image_url={"uploads/" + posterImage}
      date={moment(date).fromNow()}
      description={description}
      dataKey={_id}
    />
  );

  render() {
    const { movies, disabled, edit } = this.state;
    const { loading } = this.props;
    let { id, title } = this.props.delete;
    const filteredMovies = movies.filter(movies => {
      return (
        movies.title.toLowerCase().indexOf(this.props.search.toLowerCase()) !==
        -1
      );
    });
    // SEARCH
    return (
      <div className="movies">
        <div className="header-actions">
          <h1 className="start">Movies</h1>
          <button className="mdc-button primary-button" id="addMovie">
            Add
          </button>
        </div>
        {filteredMovies.map(this.renderMovies)}
        {/* Dialog */}
        <div
          className="mdc-dialog dev-dialog"
          loading={loading ? "true" : "false"}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          aria-describedby="dialog-content"
          id="dialog"
        >
          <div className="mdc-dialog__container">
            <div className="mdc-dialog__surface">
              <div className="progressbar">
                <div
                  role="progressbar"
                  className={`mdc-linear-progress${
                    loading
                      ? " mdc-linear-progress--indeterminate"
                      : " mdc-linear-progress--closed"
                  }`}
                >
                  <div className="mdc-linear-progress__buffering-dots" />
                  <div className="mdc-linear-progress__buffer" />
                  <div className="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
                    <span className="mdc-linear-progress__bar-inner" />
                  </div>
                  <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
                    <span className="mdc-linear-progress__bar-inner" />
                  </div>
                </div>
              </div>
              <div id="modal-overlay" />
              <div id="dialog-title">Add Movie</div>
              <div id="dialog-body">
                <Input
                  label="Title"
                  autofocus={true}
                  input={true}
                  name="title"
                  type="text"
                />
                <Input
                  label="Description"
                  input={false}
                  name="description"
                  type="text"
                />
                <Input label="Date" input={true} name="year" type="number" />
                <Input
                  label="Keywords"
                  input={true}
                  name="keyword"
                  type="text"
                /> 
                <Input label="Link" input={true} name="link" type="text" />
                <Image title="Banner Image" poster={false} />
                <Image title="Poster Image" poster={true} />
                <Genres type="movie"/>
              </div>
              <div id="dialog-button">
                <button
                  className="mdc-button primary-button"
                  data-mdc-dialog-action="cancel"
                  disabled={edit && disabled ? true : false}
                >
                  Cancel
                </button>
                <button
                  className="mdc-button secondary-button"
                  disabled={disabled}
                  id="save"
                >
                  {edit ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
          <div className="mdc-dialog__scrim" />
        </div>
        {/* SNACKBAR */}
        <div className="mdc-snackbar">
          <div className="mdc-snackbar__surface">
            <div
              className="mdc-snackbar__label"
              role="status"
              aria-live="polite"
            />
          </div>
        </div>
        {/* DIALOG */}
        <div
          id="remove"
          className="mdc-dialog"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="my-dialog-title"
          aria-describedby="my-dialog-content"
        >
          <div className="mdc-dialog__container">
            <div className="mdc-dialog__surface">
              <div id="remove-title">
                <div>Remove movie?</div>
              </div>
              <div id="remove-body">
                <div>
                  {title} will no longer be recover. Do you really want to
                  remove?
                </div>
              </div>
              <div id="remove-action">
                <button
                  className="mdc-button"
                  onClick={() => {
                    fetch(`/api/movie/remove/${id}`)
                      .then(response => response.json())
                      .then(response => {
                        const snackbar = new MDCSnackbar(
                          document.querySelector(".mdc-snackbar")
                        );
                        if (response.status) {
                          snackbar.labelText = "Movie will be removed.";
                          snackbar.open();
                        } else {
                          snackbar.labelText = "Something went wrong";
                          snackbar.open();
                        }
                        this.props.resetValue("Movies");
                        this.getData();
                      });
                  }}
                  data-mdc-dialog-action="yes"
                >
                  <span>Yes, remove</span>
                </button>
                <button
                  className="mdc-button"
                  data-mdc-dialog-action="close"
                  onClick={_ => this.props.resetValue("Movies")}
                >
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
          <div className="mdc-dialog__scrim" />
        </div>
      </div>
    );
  }
}
const mapStore = state => {
  return {
    browseTitle: state.browseTitle,
    title: state.title,
    description: state.description,
    year: state.year,
    keyword: state.keyword,
    link: state.link,
    bannerImage: state.bannerImage,
    posterImage: state.posterImage,
    genre: state.genre,
    loading: state.loading,
    //DELETE & UPDATE
    delete: state.delete,
    edit: state.edit,
    //SEARCH
    search: state.search
  };
};
const mapDispatch = dispatch => {
  return {
    changeTitle: _ => dispatch({ type: "CHANGE_TITLE", browseTitle: "Movies" }),
    resetValue: e => dispatch({ type: "RESET_VALUE", data: e }),
    handleLoad: e => dispatch({ type: "ON_CHANGE", data: { loading: e } }),
    editValue: e => dispatch({ type: "ON_CHANGE", data: e })
  };
};
export default connect(
  mapStore,
  mapDispatch
)(Movies);
