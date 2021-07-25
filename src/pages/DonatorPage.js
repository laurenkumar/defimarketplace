import React, {Suspense} from "react";
import Donator3D from "../components/donator/Donator3D";
import {Underlay, Overlay} from "../components/donator/Donator";
import "../components/donator/Donator.css";
import {motion} from "framer-motion";
import {pageTransition, pageZoom} from "../util";

function DonatorPage() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageZoom}
      transition={pageTransition}
    >

      <Underlay />
      <Suspense fallback={null}>
        <Donator3D />
      </Suspense>
    </motion.div>
  );
}
export default DonatorPage;
