import axios from "axios";

import {
  MARKET_DATA_LOADING,
  MARKET_DATA_SUCCESS,
  MARKET_DATA_FAIL,
} from "./types";

export const getMarketData = () => async (dispatch) => {
  try {
    dispatch({
      type: MARKET_DATA_LOADING,
    });

    const MarketDataAPI = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h%2C7d%2C200d`;
    const res = await axios.get(MarketDataAPI);

    dispatch({
      type: MARKET_DATA_SUCCESS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: MARKET_DATA_FAIL,
    });
  }
};
