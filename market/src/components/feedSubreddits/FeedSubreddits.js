import React from "react";
import "./feedSubreddits.css";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import moment from "moment";
import { getRedditData } from "../../redux/actions/RedditDataAction";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import LoaderIcon from "../loaderIcon/LoaderIcon";

const FeedSubreddits = () => {
  const page = {
    bitcoin: "Bitcoin",
    safemoon: "SafeMoon",
    litecoin: "Ethereum",
  };

  const dispatch = useDispatch();
  const reddit = useSelector((state) => state.RedditData);

  const ShowData = () => {
    if (reddit.loading) {
      return <LoaderIcon />;
    }

    if (!_.isEmpty(reddit.data)) {
      return reddit.data.map((el) => {
        console.log(el.data)
        return (
          <Fragment>
            <Link to={`/reddit/post/${el.data.subreddit}/${el.data.id}`}>
              <article className="show-posts-container" key={el.data.id}>
                <h2>{el.data.title}</h2>
                <div className="posts-selftext">
                  <ReactMarkdown source={el.data.selftext} />
                </div>
                {el.data.post_hint === "image" &&
                <div className="posts-img-container">
                  <img src={el.data.url} alt="" className="posts-img" />
                </div>
                }
                <div className="posts-info-section">
                  <div>
                    <p>Posted by:</p>
                    <p>{el.data.author}</p>
                  </div>
                  <div>
                    <p>Comments:</p>
                    <p>{el.data.num_comments}</p>
                  </div>
                  <div>
                    <p className="posts-time">
                      {moment.unix(el.data.created_utc).fromNow()}
                    </p>
                  </div>
                </div>
              </article>
            </Link>
          </Fragment>
        );
      });
    }

    if (reddit.errorMsg !== "") {
      return <p>{reddit.errorMsg}</p>;
    }

    return (
      <div></div>
    );
  };

  return (
    <div className="reddit-data-container coin-app">
      <h1 className='coin-text'>Check the subreddit you want to interact with</h1>
      <div className="subreddits">
        <button onClick={() => dispatch(getRedditData(page.bitcoin))}>
          Bitcoin
        </button>
        <button onClick={() => dispatch(getRedditData(page.safemoon))}>
          SafeMoon
        </button>
        <button onClick={() => dispatch(getRedditData(page.ethereum))}>
          Ethereum
        </button>
      </div>
      <div className='news-container'>
        <ShowData />
      </div>
    </div>
  );
};

export default FeedSubreddits;
