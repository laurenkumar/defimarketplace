import React, { useState, useRef } from "react";
import "./Header.css";
import amazonLogo from "../assets/logo.svg";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import DropDown from "./DropDown";
import "./SearchResults.css";
import { useHistory, useLocation } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { motion } from "framer-motion";

function Header() {
  const location = useLocation();
  const history = useHistory();
  const queryRef = useRef(null);
  const [results, setResults] = useState(null);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [{ fuse }] = useStateValue();
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    if (queryRef.current.value.length > 0) {
      setResults(fuse.search(queryRef.current.value));
      setResultsOpen(true);
    } else {
      setResults(null);
      setResultsOpen(false);
    }
  };

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          status: "👆🏽 Write a message in the text-field above.",
          address: addressArray[0],
        };
        return obj;
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };

  const styleButton = {
    height: "2rem"
  }

  return (
    <div className="header">
      <div className="header__nav">
        {location.pathname !== "/" && (
          <button onClick={() => history.goBack()} className="header__back">
            Back
          </button>
        )}
        <div className="header__search">
          <SearchRoundedIcon className="header__searchIcon" />
          <input
            type="text"
            ref={queryRef}
            onChange={handleChange}
            placeholder="Search..."
          />
        </div>
        {resultsOpen && (
          <motion.div
            className="results noScrollbar"
            initial={{ opacity: 0, y: "-1rem" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-1rem" }}
          >
            {results.map((result) => (
              <div
                onClick={() => {
                  setResultsOpen(false);
                  queryRef.current.value = "";
                  history.push(`/product/${result.item.id}`, {
                    product: result.item,
                  });
                }}
                className="result"
              >
                <div className="result__image">
                  <img src={result.item.imgUrl} />
                </div>
                <span>
                  <p className="result__title">{result.item.name}</p>
                  <small className="result__desc">
                    {result.item.feature[0]}
                  </small>
                </span>
              </div>
            ))}
          </motion.div>
        )}
        <div className="buttons" style={{ marginLeft: "auto" }}>
          <button className="buttonSecondary" id="walletButton" onClick={connectWalletPressed} style={ styleButton }>
            {walletAddress.length > 0 ? (
              "Connected: " +
              String(walletAddress).substring(0, 6) +
              "..." +
              String(walletAddress).substring(38)
            ) : (
              "Connect Wallet"
            )}
          </button>
        </div>
        <img src={amazonLogo} className="header__logo" />
      </div>
    </div>
  );
}
export default Header;
