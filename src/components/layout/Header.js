import React, {useRef, useState} from "react";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import "./Header.css";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import "./SearchResults.css";
import {useHistory, useLocation, Link} from "react-router-dom";
import {useStateValue} from "../../StateProvider";
import {motion} from "framer-motion";
import Wallet from "../wallet/Wallet";
import Modal from 'react-modal';
import {ethers} from 'ethers'
import {UnsupportedChainIdError, useWeb3React, Web3ReactProvider} from "@web3-react/core";
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected
} from "@web3-react/injected-connector";
import {
    URI_AVAILABLE,
    UserRejectedRequestError as UserRejectedRequestErrorWalletConnect
} from "@web3-react/walletconnect-connector";

import {metamask, walletconnect} from "../wallet/Connectors";
import {useEagerConnect, useInactiveListener} from "../../hooks";
import {Spinner} from "../misc/Spinner";

function Header() {
  const location = useLocation();
  const history = useHistory();
  const queryRef = useRef(null);
  const [results, setResults] = useState(null);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [{ fuse }] = useStateValue();
  const [status, setStatus] = useState("");
  const [account, setAccount] = useState('');
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const chainId = [56];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'hidden',
        background: 'rgb(39, 38, 44)',
        boxShadow: 'rgb(14 14 44 / 10%) 0px 20px 36px -8px, rgb(0 0 0 / 5%) 0px 1px 1px',
        border: '1px solid rgb(56, 50, 65)',
        borderRadius: '10px',
        maxHeight: '100vh',
        zIndex: '100',
      },
  };

  function getLibrary(provider) {
      const library = new ethers.providers.Web3Provider(provider);
      library.pollingInterval = 12000;
      return library;
  }

  const childToParent = (account) => {
     setAccount(account);
  }

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleChange = (e) => {
    if (queryRef.current.value.length > 0) {
      setResults(fuse.search(queryRef.current.value));
      setResultsOpen(true);
    } else {
      setResults(null);
      setResultsOpen(false);
    }
  };

  return (
    <header className="header">
      
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Connect Wallet"
      >
        <Web3ReactProvider getLibrary={getLibrary}>
          <Wallet childToParent={childToParent}/>
        </Web3ReactProvider>
      </Modal>
      <div className="header__nav">
        {location.pathname !== "/" && (
          <button type="button" aria-label="go back" onClick={() => history.goBack()} className="header__back">
            Back
          </button>
        )}
        <div className="header__search">
          <form>
            <SearchRoundedIcon className="header__searchIcon" />
            <input
              type="search"
              title='Search'
              aria-label='Search a product...'
              ref={queryRef}
              onChange={handleChange}
              placeholder="Search a product..."
            />
          </form>
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
        {account === undefined
          ? (
            <div className="buttons">
              <button type="button" className="buttonSecondary" onClick={openModal}>Connect</button>
            </div>
          )
          : account === null
          ? (
            <div className="buttons">
              <button type="button" className="buttonSecondary" onClick={openModal}>Connect</button>
            </div>
          )
          : !account.length
          ? (
            <div className="buttons">
              <button type="button" className="buttonSecondary" onClick={openModal}>Connect</button>
            </div>
          )
          : (
            <div className="walletMenu"> 
              <div className="walletHead" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <div className="logoWallet">
                  <svg fill="#57609c" viewBox="0 0 24 24" color="primary" width="24px" xmlns="http://www.w3.org/2000/svg" class="sc-bdnxRM ACFFk">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17 4C18.5 4 19 4.5 19 6L19 8C20.1046 8 21 8.89543 21 10L21 17C21 19 20 20 17.999 20H6C4 20 3 19 3 17L3 7C3 5.5 4.5 4 6 4L17 4ZM5 7C5 6.44772 5.44772 6 6 6L19 6L19 8L6 8C5.44772 8 5 7.55229 5 7ZM17 16C18 16 19.001 15 19 14C18.999 13 18 12 17 12C16 12 15 13 15 14C15 15 16 16 17 16Z">
                    </path>
                  </svg>
                </div>
                <div className="walletTitle"><p>{account.substring(0, 2)}...{account.substring(account.length - 4)}</p></div>
                <svg fill="#57609c" className="logoDrop" viewBox="0 0 24 24" color="text" width="24px" xmlns="http://www.w3.org/2000/svg" class="sc-bdnxRM iGEvSN">
                  <path d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z">
                  </path>
                </svg>
              </div>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <div>
                  <MenuItem onClick={handleClose}>
                    <div>
                      Your Profile 
                    </div>
                  </MenuItem>
                  <hr></hr>
                  <MenuItem onClick={handleClose}>
                    <div>
                      Disconnect
                      <svg viewBox="0 0 24 24" color="text" width="20px" xmlns="http://www.w3.org/2000/svg" class="sc-bdnxRM iGEvSN">
                        <path d="M16.3 8.09014C15.91 8.48014 15.91 9.10014 16.3 9.49014L18.2 11.3901H9C8.45 11.3901 8 11.8401 8 12.3901C8 12.9401 8.45 13.3901 9 13.3901H18.2L16.3 15.2901C15.91 15.6801 15.91 16.3001 16.3 16.6901C16.69 17.0801 17.31 17.0801 17.7 16.6901L21.29 13.1001C21.68 12.7101 21.68 12.0801 21.29 11.6901L17.7 8.09014C17.31 7.70014 16.69 7.70014 16.3 8.09014ZM4 19.3901H11C11.55 19.3901 12 19.8401 12 20.3901C12 20.9401 11.55 21.3901 11 21.3901H4C2.9 21.3901 2 20.4901 2 19.3901V5.39014C2 4.29014 2.9 3.39014 4 3.39014H11C11.55 3.39014 12 3.84014 12 4.39014C12 4.94014 11.55 5.39014 11 5.39014H4V19.3901Z">
                        </path>
                      </svg>
                    </div>
                  </MenuItem>
                </div>
              </Menu>
            </div>
          )
        }

      </div>
    </header>
  );
}
export default Header;
