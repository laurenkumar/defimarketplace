import {
  REDDITCOMMENT_DATA_LOADING,
  REDDITCOMMENT_DATA_SUCCESS,
  REDDITCOMMENT_DATA_FAIL,
} from "../actions/types";

const DefaultState = {
  loading: false,
  data: [],
  errorMsg: "",
};

const RedditCommentDataReducer = (state = DefaultState, action) => {
  switch (action.type) {
    case REDDITCOMMENT_DATA_LOADING:
      return {
        ...state,
        loading: true,
        errorMsg: "",
      };

    case REDDITCOMMENT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMsg: "",
      };

    case REDDITCOMMENT_DATA_FAIL:
      return {
        ...state,
        loading: false,
        errorMsg: "Unable to get the data",
      };

    default:
      return state;
  }
};

export default RedditCommentDataReducer;
