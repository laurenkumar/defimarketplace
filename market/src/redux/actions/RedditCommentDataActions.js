import {
  REDDITCOMMENT_DATA_LOADING,
  REDDITCOMMENT_DATA_SUCCESS,
  REDDITCOMMENT_DATA_FAIL,
} from "./types";

import axios from "axios";

export const getCommentData = (subreddit, id) => async (dispatch) => {
  try {
    dispatch({
      type: REDDITCOMMENT_DATA_LOADING,
    });

    let post = subreddit;
    let postId = id;

    const redditApi = `https://www.reddit.com/r/${post}/comments/${postId}.json`;
    const res = await axios.get(redditApi);

    dispatch({
      type: REDDITCOMMENT_DATA_SUCCESS,
      payload: res.data[1].data.children,
    });
  } catch (e) {
    dispatch({
      type: REDDITCOMMENT_DATA_FAIL,
    });
  }
};
