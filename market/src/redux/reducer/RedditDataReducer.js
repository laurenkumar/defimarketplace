import {
  REDDIT_DATA_LOADING,
  REDDIT_DATA_SUCCESS,
  REDDIT_DATA_FAIL,
} from "../actions/types";

const DefaultState = {
  loading: false,
  data: [],
  errorMsg: "",
};

const RedditDataReducer = (state = DefaultState, action) => {
  switch (action.type) {
    case REDDIT_DATA_LOADING:
      return {
        ...state,
        loading: true,
        errorMsg: "",
      };

    case REDDIT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMsg: "",
      };

    case REDDIT_DATA_FAIL:
      return {
        ...state,
        loading: false,
        errorMsg: "Unable to get the data",
      };

    default:
      return state;
  }
};

export default RedditDataReducer;
