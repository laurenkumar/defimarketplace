import React from "react";
import Calcul from "../components/calcul/Calcul";
import "../components/calcul/Calcul.css";
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
      <Calcul />
    </motion.div>
  );
}
export default Home;
