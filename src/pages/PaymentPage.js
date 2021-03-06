import React from "react";
import Payment from "../components/payments/Payment";
import {motion} from "framer-motion";
import {pageSlide, pageTransition} from "../util";

function PaymentPage() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageSlide}
      transition={pageTransition}
    >
      <Payment />
    </motion.div>
  );
}
export default PaymentPage;
