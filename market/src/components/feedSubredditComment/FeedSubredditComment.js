import React, { useEffect } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getCommentData } from "../../redux/actions/RedditCommentDataActions";
import LoaderIcon from "../loaderIcon/LoaderIcon";

const FeedSubredditComment = () => {
  const dispatch = useDispatch();
  const redditComment = useSelector((state) => state.RedditCommentData);
  const { id, subreddit } = useParams();

  useEffect(() => {
    dispatch(getCommentData(subreddit, id));
  }, [dispatch, id, subreddit]);

  console.log(redditComment);

  const ShowComment = () => {
    if (!_.isEmpty(redditComment.data)) {
      return redditComment.data.map((el) => {
        return (
          <div className="comment-container" key={el.data.id}>
            <div className="post-selftext">
              <ReactMarkdown source={el.data.body} />
            </div>
            <div className="posts-info-section">
              <p className="author">{el.data.author}</p>
              <p className="time">
                {moment.unix(el.data.created_utc).fromNow()}
              </p>
            </div>
          </div>
        );
      });
    }

    if (redditComment.loading) {
      return <LoaderIcon />;
    }

    if (redditComment.errorMsg !== "") {
      return <p>{redditComment.errorMsg}</p>;
    }

    return <p>No data</p>;
  };

  return (
    <div className="show-posts-container">
      <div>
        <h2>COMMENTS</h2>
      </div>
      <ShowComment />
    </div>
  );
};

export default FeedSubredditComment;
