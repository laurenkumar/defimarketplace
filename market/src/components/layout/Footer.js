import React from "react";
import {Link} from "react-router-dom";
import "./Footer.css";
import amazonLogo from "../../assets/logo.svg";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__inner">
        <div className="footer__disclaimer">
          <strong>Disclaimer:</strong> This is not the official Safemoon Marketplace. It
          is a project done by some fans for the community.
        </div>
        <div className="footer__bottom">
          <img src={amazonLogo} className="footer__logo" />
          <span className="footer__copy">
            &copy; 2021 | Developed by{" "}
            <a href="https://www.reddit.com/r/SafeMoon/">The SafeMoonArmy</a>
          </span>
        </div>
      </div>
    </div>
  );
}
export default Footer;
