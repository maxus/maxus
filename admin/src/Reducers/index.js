const initState = {
  browseTitle: "",
  title: "",
  description: "",
  year: "",
  keyword: "",
  link: "",
  bannerImage: "",
  posterImage: "",
  genre: [],
  loading: false,
  delete: { id: "", title: "" },
  edit: 0, //EDIT ITEM BY ID
  search: ""
};
const rootReducer = (state = initState, action) => {
  if (action.type === "CHANGE_TITLE") {
    return {
      ...state,
      browseTitle: action.browseTitle
    };
  }
  if (action.type === "ON_CHANGE") {
    const data = action.data;
    return {
      ...state,
      ...data,
      edit: ""
    };
  }
  if (action.type === "RESET_VALUE") {
    const browseTitle = action.data;
    return {
      browseTitle: browseTitle,
      title: "",
      description: "",
      year: "",
      keyword: "",
      link: "",
      bannerImage: "",
      posterImage: "",
      genre: [],
      delete: { id: "", title: "" },
      search: ""
    };
  }
  if (action.type === "DELETE") {
    const { id, title } = action;
    return { ...state, delete: { id: id, title: title } };
  }
  if (action.type === "EDIT") {
    const id = action.id;
    //console.log(id);
    return { ...state, edit: [...state.edit, id] };
  }
  if (action.type === "SEARCH") {
    const search = action.search;
    return { ...state, search: search, edit: "", delete: "" };
  }
  return state;
};
export default rootReducer;
