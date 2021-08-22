import {
  REDDITPOST_DATA_LOADING,
  REDDITPOST_DATA_SUCCESS,
  REDDITPOST_DATA_FAIL,
} from "./types";

import axios from "axios";

export const getRedditPostData = (subreddit, id) => async (dispatch) => {
  try {
    dispatch({
      type: REDDITPOST_DATA_LOADING,
    });

    let post = subreddit;
    let postId = id;

    const redditApi = `https://www.reddit.com/r/${post}/comments/${postId}.json`;
    const res = await axios.get(redditApi);

    dispatch({
      type: REDDITPOST_DATA_SUCCESS,
      payload: res.data[0].data.children[0].data,
    });
  } catch (e) {
    dispatch({
      type: REDDITPOST_DATA_FAIL,
    });
  }
};
