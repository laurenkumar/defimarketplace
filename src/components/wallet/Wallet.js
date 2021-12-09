import React, {useRef, useState} from "react";
import {Link} from "react-router-dom";
import {useStateValue} from "../../StateProvider";
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

function Wallet({childToParent}) {
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

    function getErrorMessage(error) {
      if (error instanceof NoEthereumProviderError) {
        return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
      } else if (error instanceof UnsupportedChainIdError) {
        console.log(error instanceof UnsupportedChainIdError);
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
      if (library && account) {
        let stale = false;
        childToParent(account);
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
      console.log(account)
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

    const connectorsByName = {
      Metamask: metamask,
      WalletConnect: walletconnect
    };

    return (
      <div style={{ padding: "1rem" }}>
        <div style={customStyles} className="modalTitle">
          <h1>Connect Wallet</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3
              style={{
                display: "grid",
                gridGap: "1rem",
                gridTemplateColumns: "1fr min-content 1fr",
                maxWidth: "20rem",
                lineHeight: "2rem",
                fontSize: "1.3rem",
              }}
            >
              <span>Account</span>
              <span>
                {account === undefined
                  ? "..."
                  : account === null
                  ? "None"
                  : `${account.substring(0, 6)}...${account.substring(
                      account.length - 4
                    )}`}
              </span>
            </h3>
            <span style={{ margin: "0", textAlign: "right" }}>
              {active ? "🟢" : error ? "🔴" : "🟠"}
            </span>
        </div>

        <div
          style={{
            display: "grid",
            gridGap: "1rem",
            paddingTop: "2rem",
            gridTemplateColumns: "1fr 1fr",
            maxWidth: "20rem"
          }}
          className="buttons"
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
                  borderRadius: "7px",
                  borderColor: activating
                    ? "orange"
                    : connected
                    ? "green"
                    : "unset",
                  cursor: disabled ? "unset" : "pointer",
                  position: "relative"
                }}
                className="button buttonPrimary"
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
            <div className="buttons" style={{ marginTop : "1rem", textAlign: "center" }}>
              <button
                className="button buttonRed"
                style={{ padding: "1rem", height: "1rem" }}
                onClick={() => {
                  deactivate();
                }}
              >
                Deactivate
              </button>
            </div>
          )}

          {!!error && (
            <h4 style={{ marginTop: "1rem", marginBottom: "0" }}>
              {getErrorMessage(error)}
            </h4>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridGap: "1rem",
            gridTemplateColumns: "fit-content",
            maxWidth: "20rem"
          }}
        >
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
        <div style={{ paddingTop: "2.5rem", paddingBottom: "12px" }}>
            <p className="pHelp">Haven’t got a crypto wallet yet?</p>
            <div className="buttons">
              <Link to={`/connection-guide`} className="buttonHelp">
                <strong>Learn How to Connect</strong>
              </Link>
            </div>
        </div>
      </div>
    );
  }

export default Wallet;
