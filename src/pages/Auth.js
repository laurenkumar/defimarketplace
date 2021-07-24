import React from "react";
import {pageSlide, pageTransition, useQuery} from "../util";
import Login from "../components/auth/Login";
import PasswordReset from "../components/auth/PasswordReset";
import {motion} from "framer-motion";

function Auth() {
  const query = useQuery();

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageSlide}
      transition={pageTransition}
    >
      {query.get("mode") === "verifyEmail" && <Login />}
      {query.get("mode") === "resetPassword" && <PasswordReset />}
    </motion.div>
  );
}

export default Auth;
