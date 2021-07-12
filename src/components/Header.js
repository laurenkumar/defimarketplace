import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
import amazonLogo from "../assets/logo.svg";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import DropDown from "./DropDown";
import "./SearchResults.css";
import { useHistory, useLocation } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { motion } from "framer-motion";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError
} from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from "@web3-react/injected-connector";
import {
  URI_AVAILABLE,
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect
} from "@web3-react/walletconnect-connector";
import { Web3Provider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";

import {
  injected,
  walletconnect,
  walletlink
} from "../connectors";
import { useEagerConnect, useInactiveListener } from "../hooks";
import { Spinner } from "../Spinner";

function Header() {
  const location = useLocation();
  const history = useHistory();
  const queryRef = useRef(null);
  const [results, setResults] = useState(null);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [{ fuse }] = useStateValue();
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const connectorsByName = {
    Injected: injected,
    WalletConnect: walletconnect,
    WalletLink: walletlink
  };

  function getErrorMessage(error) {
    if (error instanceof NoEthereumProviderError) {
      return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
    } else if (error instanceof UnsupportedChainIdError) {
      return "You're connected to an unsupported network.";
    } else if (
      error instanceof UserRejectedRequestErrorInjected ||
      error instanceof UserRejectedRequestErrorWalletConnect
    ) {
      return "Please authorize this website to access your Ethereum account.";
    } else {
      console.error(error);
      return "An unknown error occurred. Check the console for more details.";
    }
  }

  function getLibrary(provider) {
    const library = new Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
  }

  function MyComponent() {
    const context = useWeb3React();
    const {
      connector,
      library,
      chainId,
      account,
      activate,
      deactivate,
      active,
      error
    } = context;

    // handle logic to recognize the connector currently being activated
    const [activatingConnector, setActivatingConnector] = React.useState();
    React.useEffect(() => {
      console.log('running')
      if (activatingConnector && activatingConnector === connector) {
        setActivatingConnector(undefined);
      }
    }, [activatingConnector, connector]);

    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect();

    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector);

    // set up block listener
    const [blockNumber, setBlockNumber] = React.useState();
    React.useEffect(() => {
      console.log('running')
      if (library) {
        let stale = false;

        console.log('fetching block number!!')
        library
          .getBlockNumber()
          .then(blockNumber => {
            if (!stale) {
              setBlockNumber(blockNumber);
            }
          })
          .catch(() => {
            if (!stale) {
              setBlockNumber(null);
            }
          });

        const updateBlockNumber = blockNumber => {
          setBlockNumber(blockNumber);
        };
        library.on("block", updateBlockNumber);

        return () => {
          library.removeListener("block", updateBlockNumber);
          stale = true;
          setBlockNumber(undefined);
        };
      }
    }, [library, chainId]);

    // fetch eth balance of the connected account
    const [ethBalance, setEthBalance] = React.useState();
    React.useEffect(() => {
      console.log('running')
      if (library && account) {
        let stale = false;

        library
          .getBalance(account)
          .then(balance => {
            if (!stale) {
              setEthBalance(balance);
            }
          })
          .catch(() => {
            if (!stale) {
              setEthBalance(null);
            }
          });

        return () => {
          stale = true;
          setEthBalance(undefined);
        };
      }
    }, [library, account, chainId]);

    // log the walletconnect URI
    React.useEffect(() => {
      console.log('running')
      const logURI = uri => {
        console.log("WalletConnect URI", uri);
      };
      walletconnect.on(URI_AVAILABLE, logURI);

      return () => {
        walletconnect.off(URI_AVAILABLE, logURI);
      };
    }, []);

    return (
      <div style={{ padding: "1rem" }}>
        <h1 style={{ margin: "0", textAlign: "right" }}>
          {active ? "🟢" : error ? "🔴" : "🟠"}
        </h1>
        <h3
          style={{
            display: "grid",
            gridGap: "1rem",
            gridTemplateColumns: "1fr min-content 1fr",
            maxWidth: "20rem",
            lineHeight: "2rem",
            margin: "auto"
          }}
        >
          <span>Chain Id</span>
          <span role="img" aria-label="chain">
            ⛓
          </span>
          <span>{chainId === undefined ? "..." : chainId}</span>

          <span>Block Number</span>
          <span role="img" aria-label="numbers">
            🔢
          </span>
          <span>
            {blockNumber === undefined
              ? "..."
              : blockNumber === null
              ? "Error"
              : blockNumber.toLocaleString()}
          </span>

          <span>Account</span>
          <span role="img" aria-label="robot">
            🤖
          </span>
          <span>
            {account === undefined
              ? "..."
              : account === null
              ? "None"
              : `${account.substring(0, 6)}...${account.substring(
                  account.length - 4
                )}`}
          </span>

          <span>Balance</span>
          <span role="img" aria-label="gold">
            💰
          </span>
          <span>
            {ethBalance === undefined
              ? "..."
              : ethBalance === null
              ? "Error"
              : `Ξ${parseFloat(formatEther(ethBalance)).toPrecision(4)}`}
          </span>
        </h3>
        <hr style={{ margin: "2rem" }} />
        <div
          style={{
            display: "grid",
            gridGap: "1rem",
            gridTemplateColumns: "1fr 1fr",
            maxWidth: "20rem",
            margin: "auto"
          }}
        >
          {Object.keys(connectorsByName).map(name => {
            const currentConnector = connectorsByName[name];
            const activating = currentConnector === activatingConnector;
            const connected = currentConnector === connector;
            const disabled =
              !triedEager || !!activatingConnector || connected || !!error;

            return (
              <button
                style={{
                  height: "3rem",
                  borderRadius: "1rem",
                  borderColor: activating
                    ? "orange"
                    : connected
                    ? "green"
                    : "unset",
                  cursor: disabled ? "unset" : "pointer",
                  position: "relative"
                }}
                disabled={disabled}
                key={name}
                onClick={() => {
                  setActivatingConnector(currentConnector);
                  activate(connectorsByName[name]);
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    color: "black",
                    margin: "0 0 0 1rem"
                  }}
                >
                  {activating && (
                    <Spinner
                      color={"black"}
                      style={{ height: "25%", marginLeft: "-1rem" }}
                    />
                  )}
                  {connected && (
                    <span role="img" aria-label="check">
                      ✅
                    </span>
                  )}
                </div>
                {name}
              </button>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {(active || error) && (
            <button
              style={{
                height: "3rem",
                marginTop: "2rem",
                borderRadius: "1rem",
                borderColor: "red",
                cursor: "pointer"
              }}
              onClick={() => {
                deactivate();
              }}
            >
              Deactivate
            </button>
          )}

          {!!error && (
            <h4 style={{ marginTop: "1rem", marginBottom: "0" }}>
              {getErrorMessage(error)}
            </h4>
          )}
        </div>

        <hr style={{ margin: "2rem" }} />

        <div
          style={{
            display: "grid",
            gridGap: "1rem",
            gridTemplateColumns: "fit-content",
            maxWidth: "20rem",
            margin: "auto"
          }}
        >
          {!!(library && account) && (
            <button
              style={{
                height: "3rem",
                borderRadius: "1rem",
                cursor: "pointer"
              }}
              onClick={() => {
                library
                  .getSigner(account)
                  .signMessage("👋")
                  .then(signature => {
                    window.alert(`Success!\n\n${signature}`);
                  })
                  .catch(error => {
                    window.alert(
                      "Failure!" +
                        (error && error.message ? `\n\n${error.message}` : "")
                    );
                  });
              }}
            >
              Sign Message
            </button>
          )}
          {connector === walletconnect && (
            <button
              style={{
                height: "3rem",
                borderRadius: "1rem",
                cursor: "pointer"
              }}
              onClick={() => {
                connector.close();
              }}
            >
              Kill WalletConnect Session
            </button>
          )}
          
        </div>
      </div>
    );
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

  const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: "👆🏽 Write a message in the text-field above.",
          };
        } else {
          return {
            address: "",
            status: "🦊 Connect to Metamask using the top right button.",
          };
        }
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

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

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

  useEffect(async () => {
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address)
    setStatus(status);
    
    addWalletListener(); 
  }, []);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
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
    </Web3ReactProvider>
  );
}
export default Header;
