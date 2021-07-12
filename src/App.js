import React, { useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./components/Button.css";
import Home from "./views/Home";
import Auth from "./views/Auth";
import OrdersPage from "./views/OrdersPage";
import AdminPage from "./views/AdminPage";
import ProductPage from "./views/ProductPage";
import PaymentPage from "./views/PaymentPage";
import CartPage from "./views/CartPage";
import DonationPage from "./views/DonationPage";
import BookmarkPage from "./views/BookmarkPage";
import UserPage from "./views/UserPage";
import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import "./App.css";
import db, { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import LoadingBar from "react-top-loading-bar";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { shuffleArray } from "./util";
import Fuse from "fuse.js";
import axios from "axios";
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
} from "./connectors";
import { useEagerConnect, useInactiveListener } from "./hooks";
import { Spinner } from "./Spinner";

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

const promise = loadStripe(
  "pk_test_51HdsPRE4K4vYNE8J6n2SZ7Q68Z8mqdHJROiHxnm7U5yeTk8oBed7LF3IqSZGSlr1vso40SYgMc3NWeYCvuhKfv6H00pu5ZkJi3"
);
const elFonts = [
  {
    cssSrc:
      "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@800&display=swap",
  },
];

function App() {
  const location = useLocation();
  const [{ user, cart }, dispatch] = useStateValue();
  const loadingBar = useRef(null);

  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    const localBookmarks = localStorage.getItem("bookmarks");
    if (localCart) {
      dispatch({
        type: "RESTORE_CART",
        cart: JSON.parse(localCart),
      });
    }
    if (localBookmarks) {
      dispatch({
        type: "RESTORE_BOOKMARKS",
        bookmarks: JSON.parse(localBookmarks),
      });
    }
  }, []);

  useEffect(() => {
    if (loadingBar) {
      dispatch({
        type: "LOADING_BAR",
        loadingBar: loadingBar,
      });
    }
  }, [loadingBar]);

  useEffect(() => {
    loadingBar.current.continuousStart();
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    axios
      .get("/api/products")
      .then((snapshot) => {
        dispatch({
          type: "SET_PRODUCTS",
          products: shuffleArray(snapshot.data),
        });
        const fuse = new Fuse(snapshot.data, { keys: ["name", "category"] });
        dispatch({
          type: "SET_FUSE",
          fuse: fuse,
        });
      })
      .then(() => {
        loadingBar.current.complete();
      });
  }, [dispatch]);

  return (
    <div className="app">
      <LoadingBar height={3} color="#78cac8" ref={loadingBar} shadow={true} />
      <Sidebar />
      <div className="app__inner">
        <AnimatePresence exitBeforeEnter>
          <AnimateSharedLayout>
            <Web3ReactProvider getLibrary={getLibrary}>
              <Header />
            </Web3ReactProvider>
            <Switch location={location} key={location.pathname}>
              <Route path="/product/:id">
                <ProductPage />
              </Route>
              <Route path="/cart">
                <CartPage />
              </Route>
              <Route path="/bookmarks">
                <BookmarkPage />
              </Route>
              <Route path="/login">
                <UserPage type="login" />
              </Route>
              <Route path="/signup">
                <UserPage type="signup" />
              </Route>
              <Route path="/welcome">
                <UserPage type="welcome" />
              </Route>
              <Route path="/store">
                <UserPage type="store" />
              </Route>
              <Route path="/password-reset">
                <UserPage type="passwordReset" />
              </Route>
              <Route path="/profile">
                <UserPage type="profile" />
              </Route>
              <Route path="/auth">
                <Auth />
              </Route>
              <Route path="/admin">
                <AdminPage />
              </Route>
              <Route path="/Donation">
                <DonationPage />
              </Route>
              <Route path="/payment">
                <Elements options={{ fonts: elFonts }} stripe={promise}>
                  <PaymentPage />
                </Elements>
              </Route>
              <Route path="/orders">
                <OrdersPage />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </AnimateSharedLayout>
        </AnimatePresence>
      </div>
      <div
        className="app__spacing"
        style={{ marginTop: "auto", marginBottom: "5rem" }}
      ></div>
      <Footer />
    </div>
  );
}

export default App;
