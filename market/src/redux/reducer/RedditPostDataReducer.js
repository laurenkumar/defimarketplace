import {
  REDDITPOST_DATA_LOADING,
  REDDITPOST_DATA_SUCCESS,
  REDDITPOST_DATA_FAIL,
} from "../actions/types";

const DefaultState = {
  loading: false,
  data: {},
  errorMsg: "",
};

const RedditPostDataReducer = (state = DefaultState, action) => {
  switch (action.type) {
    case REDDITPOST_DATA_LOADING:
      return {
        ...state,
        loading: true,
        errorMsg: "",
      };

    case REDDITPOST_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMsg: "",
      };

    case REDDITPOST_DATA_FAIL:
      return {
        ...state,
        loading: false,
        errorMsg: "Unable to get the data",
      };

    default:
      return state;
  }
};

export default RedditPostDataReducer;
