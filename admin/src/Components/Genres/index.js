import React, { Component } from "react";
import { connect } from "react-redux";
import { MDCMenu } from "@material/menu";
import "./style.css";
class Genres extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      selectedGenres: []
    };
  }
  componentDidMount() {
    this.getGenre();
  }
  componentDidUpdate() {
    //console.log(this.state.selectedGenres);
    this.props.handleGenre(this.state.selectedGenres);
  }
  getGenre = _ => {
    fetch(`/api/genre/${this.props.type}`)
      .then(response => response.json())
      .then(response => this.setState({ genres: response }))
      .catch(err => console.error(err));
  };
  componentWillReceiveProps(newProps) {
    this.setState({ selectedGenres: newProps.genre });
  }
  renderMenu = () => {
    const menu = new MDCMenu(document.querySelector(".mdc-menu"));
    menu.open = true;
  };
  checkboxValue(event) {
    let check = event.target.checked;
    //let value = event.target.value;
    let gkey = event.currentTarget.attributes["data-id"].value;
    if (check) {
      this.setState({
        selectedGenres: [...this.state.selectedGenres, gkey]
      });
    } else {
      this.setState({
        selectedGenres: this.state.selectedGenres.filter(selectedGenres => {
          return selectedGenres !== gkey;
        })
      });
    }
  }
  checked = key => {
    const { genre } = this.props;
    if (genre.includes(key)) return true;
    else return false;
  };
  renderGenre = ({ _id, name }) => (
    <div className="mdc-form-field" key={_id} id="check_box--genre">
      <div className="mdc-checkbox">
        <input
          type="checkbox"
          className="mdc-checkbox__native-control"
          id={_id}
          data-id={_id}
          value={name}
          onChange={this.checkboxValue.bind(this)}
          checked={this.checked(_id)}
        />
        <div className="mdc-checkbox__background">
          <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
            <path
              className="mdc-checkbox__checkmark-path"
              fill="none"
              d="M1.73,12.91 8.1,19.28 22.79,4.59"
            />
          </svg>
          <div className="mdc-checkbox__mixedmark" />
        </div>
      </div>
      <label htmlFor={_id}>{name}</label>
    </div>
  );
  gfil = k => {
    const { genres } = this.state;
    if (genres === undefined || genres.length === 0) {
      console.warn("GENRES WENT WRONG");
    } else {
      const b = genres.filter(item => {
        return item._id === k;
      });
      return b[0].name;
    }
  };
  render() {
    const { genres } = this.state;
    const { genre } = this.props;
    return (
      <div id="genre" className="mdc-menu-surface--anchor">
        <div id="label">Add genres</div>
        <div className="mdc-chip-set">
          <div
            className="mdc-chip chip-shaped"
            tabIndex="0"
            onClick={this.renderMenu}
          >
            <div className="mdc-chip__checkmark">
              <i className="material-icons">edit</i>
            </div>
          </div>
          {genre.map((genre, index) => (
            <div className="mdc-chip chip-shaped" tabIndex="0" key={index}>
              <div className="mdc-chip__text">{this.gfil(genre)}</div>
            </div>
          ))}
        </div>

        <div
          className="mdc-menu mdc-menu-surface"
          id="select-genres"
          tabIndex="-1"
        >
          <ul
            className="mdc-list"
            role="menu"
            aria-hidden="true"
            aria-orientation="vertical"
          >
            {genres.map(this.renderGenre)}
          </ul>
        </div>
      </div>
    );
  }
}
const mapStore = state => {
  return {
    genre: state.genre
  };
};
const mapDispatchToProps = dispatch => {
  return {
    handleGenre: value => {
      dispatch({ type: "ON_CHANGE", data: { genre: value } });
    }
  };
};
export default connect(
  mapStore,
  mapDispatchToProps
)(Genres);
