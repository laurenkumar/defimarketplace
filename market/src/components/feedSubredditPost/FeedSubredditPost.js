import React, { useEffect } from "react";
import "./feedSubredditPost.css";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getRedditPostData } from "../../redux/actions/RedditPostDataActions";
import ReactMarkdown from "react-markdown";
import moment from "moment";
import ScrollToTop from "../../helpers/ScrollToTop";

const FeedSubredditPost = () => {
  const dispatch = useDispatch();
  const redditPost = useSelector((state) => state.RedditPostData);

  const { id, subreddit } = useParams();
  let history = useHistory();

  useEffect(() => {
    dispatch(getRedditPostData(subreddit, id));
  }, [dispatch, id, subreddit]);

  const ShowPost = () => {
    if (!_.isEmpty(redditPost.data)) {
      return (
        <div className="show-posts-container" key={redditPost.data.id}>
          <h2>{redditPost.data.title}</h2>
          {redditPost.data.post_hint === "image" &&
            <div className="posts-img-container">
              <img src={redditPost.data.url} alt="" className="posts-img" />
            </div>
          }
          <div className="post-selftext">
            <ReactMarkdown source={redditPost.data.selftext} />
          </div>
          <div className="posts-info-section">
            <p>
              Posted by: <span>{redditPost.data.author}</span>
            </p>
            <p className="posts-time">
              {moment.unix(redditPost.data.created_utc).fromNow()}
            </p>
            <p>Comments: {redditPost.data.num_comments}</p>
          </div>
        </div>
      );
    }

    if (redditPost.loading) {
      return <p>Loading...</p>;
    }

    if (redditPost.errorMsg !== "") {
      return <p>{redditPost.errorMsg}</p>;
    }

    return <p>No data</p>;
  };

  return (
    <div className="post-page-component">
      <button className="header__back"
        onClick={() => {
          history.push("/subs");
        }}
      >
        <span>Back</span>
      </button>
      <ShowPost />
      <ScrollToTop />
    </div>
  );
};

export default FeedSubredditPost;
