import React, { Component } from "react";
import { connect } from "react-redux";
import { MDCDialog } from "@material/dialog";
//import { MDCTab } from "@material/tab";
import { MDCTabBar } from "@material/tab-bar";
import Input from "../../Components/Input";
import "./style.css";
class Animes extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      animes: [],
      disabled: true,
      edit: null,
      tab: 0,
      show: null
    };
  }
  componentDidMount() {
    const { tab } = this.state;
    this.props.resetValue("Animes");
    document.title = "MAXUS - Animes";

    const dialogElement = document.querySelector(".mdc-dialog");

    const tabbar = new MDCTabBar(document.querySelector(".mdc-tab-bar"));
    const dialog = new MDCDialog(dialogElement);
    document.querySelector("#addAnime").onclick = () => {
      this.props.resetValue("Animes");
      this.setState({ edit: null, show: true });
      tabbar.activateTab(tab);
      dialog.open();
    };
    dialog.scrimClickAction = "";
    dialog.escapeKeyAction = "";
  }
  handleTab = e => {
    if (e === 1) this.setState({ show: true });
    else {
      this.setState({ show: false });
    }
  };
  render() {
    const { disabled, edit, show } = this.state;
    const { loading } = this.props;
    return (
      <div className="animes">
        <div className="header-actions">
          <h1 className="start">Animes</h1>
          <button className="mdc-button primary-button" id="addAnime">
            Add
          </button>
        </div>
        {/* GET ANIMES */}
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
              <div id="dialog-title">Add Anime</div>
              <div id="header">
                <div className="mdc-tab-bar" role="tablist">
                  <div className="mdc-tab-scroller">
                    <div className="mdc-tab-scroller__scroll-area">
                      <div className="mdc-tab-scroller__scroll-content">
                        <button
                          className="mdc-tab mdc-tab--active"
                          role="tab"
                          aria-selected="true"
                          tabIndex="0"
                          onClick={() => this.handleTab(1)}
                        >
                          <span className="mdc-tab__content">
                            <span className="mdc-tab__text-label">
                              New Anime
                            </span>
                          </span>
                          <span className="mdc-tab-indicator mdc-tab-indicator--active">
                            <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline" />
                          </span>
                          <span className="mdc-tab__ripple" />
                        </button>
                        <button
                          className="mdc-tab"
                          role="tab"
                          aria-selected="true"
                          tabIndex="0"
                          onClick={() => this.handleTab(2)}
                        >
                          <span className="mdc-tab__content">
                            <span className="mdc-tab__text-label">
                              Add Episode
                            </span>
                          </span>
                          <span className="mdc-tab-indicator">
                            <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline" />
                          </span>
                          <span className="mdc-tab__ripple" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="dialog-body">
                <div id="addAnimes" className={show ? "" : "hidden"}>
                  <Input
                    label="Title"
                    autofocus={true}
                    input={true}
                    name="title"
                    type="text"
                    ref={this.input}
                  />
                </div>
                <div id="addEpisode" className={show ? "hidden" : ""}>
                  addEpisode
                </div>
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
)(Animes);
