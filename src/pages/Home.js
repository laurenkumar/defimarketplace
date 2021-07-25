import React from "react";
import Categories from "../components/categories/Categories";
import Main from "../components/Main";
import {motion} from "framer-motion";
import {pageSlide, pageTransition} from "../util";

function Home() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageSlide}
      transition={pageTransition}
    >
      <Categories />
      <Main />
    </motion.div>
  );
}
export default Home;
