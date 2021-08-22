import React from "react";
import FeedSubreddits from "../components/feedSubreddits/FeedSubreddits";
import {motion} from "framer-motion";
import {pageTransition, pageZoom} from "../util";

function RedditPostPage() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageZoom}
      transition={pageTransition}
    >
      <FeedSubreddits />
    </motion.div>
  );
}

export default RedditPostPage;