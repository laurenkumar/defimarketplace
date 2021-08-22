import {
  MARKET_DATA_LOADING,
  MARKET_DATA_SUCCESS,
  MARKET_DATA_FAIL,
} from "../actions/types";

const DefaultState = {
  loading: false,
  data: [],
  errorMsg: "",
};

const MarketDataReducer = (state = DefaultState, action) => {
  switch (action.type) {
    case MARKET_DATA_LOADING:
      return {
        ...state,
        loading: true,
        errorMsg: "",
      };

    case MARKET_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMsg: "",
      };

    case MARKET_DATA_FAIL:
      return {
        ...state,
        loading: false,
        errorMsg: "Unable to get the data",
      };

    default:
      return state;
  }
};

export default MarketDataReducer;
