import axios from "axios";

import {
  REDDIT_DATA_LOADING,
  REDDIT_DATA_SUCCESS,
  REDDIT_DATA_FAIL,
} from "./types";

export const getRedditData = (page) => async (dispatch) => {
  try {
    dispatch({
      type: REDDIT_DATA_LOADING,
    });

    const reddit = page;

    const redditApi = `https://www.reddit.com/r/${reddit}.json`;
    const res = await axios.get(redditApi);

    dispatch({
      type: REDDIT_DATA_SUCCESS,
      payload: res.data.data.children,
    });
  } catch (e) {
    dispatch({
      type: REDDIT_DATA_FAIL,
    });
  }
};
