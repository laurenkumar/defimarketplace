import {
  NEWS_DATA_LOADING,
  NEWS_DATA_SUCCESS,
  NEWS_DATA_FAIL,
} from "../actions/types";

const DefaultState = {
  loading: false,
  data: [],
  errorMsg: "",
};

const NewsDataReducer = (state = DefaultState, action) => {
  switch (action.type) {
    case NEWS_DATA_LOADING:
      return {
        ...state,
        loading: true,
        errorMsg: "",
      };

    case NEWS_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMsg: "",
      };

    case NEWS_DATA_FAIL:
      return {
        ...state,
        loading: false,
        errorMsg: "Unable to get the data",
      };

    default:
      return state;
  }
};

export default NewsDataReducer;
