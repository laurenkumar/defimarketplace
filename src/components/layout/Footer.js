import React from "react";
import {Link} from "react-router-dom";
import "./Footer.css";
import amazonLogo from "../../assets/logo.svg";

const footerLinks = [
  {
    title: "Get to Know Us",
    list: ["Donation", "Donator"],
  },
  {
    title: "More Informations",
    list: ["Market"],
  },
];

function Footer() {
  return (
    <div className="footer">
      <div className="footer__inner">
        <div className="footer__disclaimer">
          <strong>Disclaimer:</strong> This is not the official Safemoon Marketplace. It
          is a project done by a fan for the community.
        </div>
        <div className="footer__links">
          {footerLinks.map((link) => (
            <div className="footer__row">
              <h6>{link.title}</h6>
              <ul>
                {link.list.map((item) => (
                  <li key={item}>
                    <Link key={item} to={`/${item}`}>
                      <strong>{item}</strong>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer__bottom">
          <img src={amazonLogo} className="footer__logo" />
          <span className="footer__copy">
            &copy; 2021 | Developed by{" "}
            <a href="">The Community of SafeMoon</a>
          </span>
        </div>
      </div>
    </div>
  );
}
export default Footer;
