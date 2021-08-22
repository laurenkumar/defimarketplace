import React from "react";
import FeedSubredditComment from "../components/feedSubredditComment/FeedSubredditComment";
import FeedSubredditPost from "../components/feedSubredditPost/FeedSubredditPost";
import {motion} from "framer-motion";
import {pageTransition, pageZoom} from "../util";

function RedditPage() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageZoom}
      transition={pageTransition}
    >
      <FeedSubredditPost />
      <FeedSubredditComment />
    </motion.div>
  );
}

export default RedditPage;