import { combineReducers } from "redux";
import MarketDataReducer from "./MarketDataReducer";
import NewsDataReducer from "./NewsDataReducer";
import RedditCommentDataReducer from "./RedditCommentDataReducer";
import RedditDataReducer from "./RedditDataReducer";
import RedditPostDataReducer from "./RedditPostDataReducer";

const RootReducer = combineReducers({
  MarketData: MarketDataReducer,
  RedditData: RedditDataReducer,
  RedditPostData: RedditPostDataReducer,
  RedditCommentData: RedditCommentDataReducer,
  NewsData: NewsDataReducer,
});

export default RootReducer;
