import React from "react";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import Welcome from "../components/auth/Welcome";
import Store from "../components/Store";
import PasswordReset from "../components/auth/PasswordReset";
import Profile from "../components/user/Profile";
import {motion} from "framer-motion";
import {pageSlide, pageTransition} from "../util";

function UserPage({ type }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageSlide}
      transition={pageTransition}
    >
      {type === "login" && <Login />}
      {type === "signup" && <Signup />}
      {type === "welcome" && <Welcome />}
      {type === "passwordReset" && <PasswordReset />}
      {type === "profile" && <Profile />}
      {type === "store" && <Store />}
    </motion.div>
  );
}
export default UserPage;
