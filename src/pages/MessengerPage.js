import React from "react";
import Messenger from "../components/messenger/Messenger";
import {motion} from "framer-motion";
import {pageTransition, pageZoom} from "../util";

function MessengerPage() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageZoom}
      transition={pageTransition}
    >
      <Messenger />
    </motion.div>
  );
}
export default MessengerPage;
