import React, {Suspense} from "react";
import Donator3D from "../components/donator/Donator3D";
import {Underlay, Overlay} from "../components/donator/Donator";
import "../components/donator/Donator.css";
import {motion} from "framer-motion";
import {pageTransition, pageZoom} from "../util";

function DonatorPage() {
  console.log("toto")
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
      <Overlay />
    </motion.div>
  );
}
export default DonatorPage;
