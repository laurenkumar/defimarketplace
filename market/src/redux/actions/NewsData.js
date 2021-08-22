import axios from "axios";
// import getPastDate from "../../helpers/getPastDate";
import { NEWS_DATA_LOADING, NEWS_DATA_SUCCESS, NEWS_DATA_FAIL } from "./types";

require("dotenv").config();

export const getNewsData = () => async (dispatch) => {
  try {
    dispatch({
      type: NEWS_DATA_LOADING,
    });

    const apiKey = "3663a9f5329764cf1780627b1a669d96";

    const redditApi = `https://gnews.io/api/v4/search?q=safemoon&sortby=relevance&lang=en&token=${apiKey}`;
    const res = await axios.get(redditApi);

    dispatch({
      type: NEWS_DATA_SUCCESS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: NEWS_DATA_FAIL,
    });
  }
};
