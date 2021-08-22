import React from "react";
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
      <Main />
    </motion.div>
  );
}
export default Home;
