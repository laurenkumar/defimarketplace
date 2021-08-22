import React from "react";
import FeedNews from "../components/feedNews/FeedNews";
import "../components/news/News.css";
import {motion} from "framer-motion";
import {pageTransition, pageZoom} from "../util";

function NewsPage() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageZoom}
      transition={pageTransition}
    >
      <FeedNews />
    </motion.div>
  );
}
export default NewsPage;
