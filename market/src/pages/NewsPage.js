import React from "react";
import News from "../components/news/News";
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
      <News />
    </motion.div>
  );
}
export default NewsPage;
