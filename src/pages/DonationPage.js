import React from "react";
import Donation from "../components/donations/Donation";
import {motion} from "framer-motion";
import {pageTransition, pageZoom} from "../util";

function DonationPage() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageZoom}
      transition={pageTransition}
    >
      <Donation />
    </motion.div>
  );
}
export default DonationPage;
