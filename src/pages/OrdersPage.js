import React from "react";
import Orders from "../components/orders/Orders";
import {motion} from "framer-motion";
import {pageSlide, pageTransition} from "../util";

function OrdersPage() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageSlide}
      transition={pageTransition}
    >
      <Orders />
    </motion.div>
  );
}
export default OrdersPage;
