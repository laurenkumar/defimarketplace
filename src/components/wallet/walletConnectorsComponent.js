import React from "react";
import {UnsupportedChainIdError, useWeb3React} from "@web3-react/core";
import {
    URI_AVAILABLE,
    UserRejectedRequestError as UserRejectedRequestErrorWalletConnect
} from "@web3-react/walletconnect-connector";
import {formatEther} from "@ethersproject/units";
import {Spinner} from "../misc/Spinner";
import {walletconnect} from "./connectors";

function BalanceComponent() {
    const {account, library, chainId} = useWeb3React()
    const [balance, setBalance] = React.useState();
    React.useEffect(() => {
        if (!!library && !!account) {
            let stale = false;
            library
                .getBalance(account)
                .then(balance => {
                    if (!stale) {
                        setBalance(balance);
                    }
                })
                .catch(() => {
                    if (!stale) {
                        setBalance(null);
                    }
                });

            return () => {
                stale = true;
                setBalance(undefined);
            };
        }
    }, [library, account, chainId])


    function formatBalance(balance) {
        if (balance === null) {
            return 'Error'
        } else if (balance) {
            return formatEther(balance);
        } else {
            return '';
        }
    }

    if (balance !== null && balance !== undefined)
        return (
            <>
                <h3 style={{
                    display: "grid",
                    gridGap: "1rem",
                    gridTemplateColumns: "1fr min-content 1fr",
                    maxWidth: "20rem",
                    lineHeight: "2rem",
                    margin: "auto"
                }}>
                    <span>Balance</span>
                    <span>{formatBalance(balance)}</span>
                </h3>
            </>
        );
    else
        return (<></>)
}


function AccountComponent() {
    const {account} = useWeb3React()

    function formatAccount(account) {
        if (account === undefined)
            return '...';
        else if (account !== null)
            return account.substring(0, 6) + '...' + account.substring(account.length - 4);
        else
            return 'None'
    }


    if (account !== null && account !== undefined)
        return (
            <>
                <h3 style={{
                    display: "grid",
                    gridGap: "1rem",
                    gridTemplateColumns: "1fr min-content 1fr",
                    maxWidth: "20rem",
                    lineHeight: "2rem",
                    margin: "auto"
                }}>
                    <span>Account</span>
                    <span>
                        {formatAccount(account)}
                    </span>
                </h3>
            </>
        );
    else
        return (<></>);
}


export function WalletConnectorsComponent() {
    const connectorsByName = {
        WalletConnect: walletconnect,
    };
    const context = useWeb3React();
    const {
        connector,
        activate,
        deactivate,
        active,
        error
    } = context;

    // handle logic to recognize the connector currently being activated
    const [activatingConnector, setActivatingConnector] = React.useState()
    React.useEffect(() => {
        if (activatingConnector === connector) {
            setActivatingConnector(undefined)
        }
    }, [activatingConnector, connector])

    // log the walletconnect URI
    React.useEffect(() => {
        const logURI = uri => {
            console.info("WalletConnect protocol is connecting on", uri);
        };
        walletconnect.on(URI_AVAILABLE, logURI);
        return () => {
            const logoutURI = uri => {
                console.info("WalletConnect protocol is closing connection with", uri);
            };
            walletconnect.off(URI_AVAILABLE, logoutURI);
        };
    }, []);


    function getErrorMessage(error) {
        if (error instanceof UnsupportedChainIdError) {
            console.log(error instanceof UnsupportedChainIdError);
            return "You're connected to an unsupported network.";
        } else if (
            error instanceof UserRejectedRequestErrorWalletConnect
        ) {
            return "Please authorize this website to access your Ethereum account.";
        } else {
            console.error(error);
            return "An unknown error occurred. Check the console for more details.";
        }
    }

    return (
        <div style={{padding: "1rem"}}>
            <h1 style={{margin: "0", textAlign: "right"}}>
                {active ? "🟢" : error ? "🔴" : "🟠"}
            </h1>
            <AccountComponent/>
            <BalanceComponent/>

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
                    const disabled = !!activatingConnector || connected || !!error;

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
                                        color={"blue"}
                                        style={{height: "25%", marginLeft: "-1rem"}}
                                    />
                                )}
                                {connected && (
                                    <span role="img" aria-label="check">✅</span>
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
                    <h4 style={{marginTop: "1rem", marginBottom: "0"}}>
                        {getErrorMessage(error)}
                    </h4>
                )}
            </div>

            <div
                style={{
                    display: "grid",
                    gridGap: "1rem",
                    gridTemplateColumns: "fit-content",
                    maxWidth: "20rem",
                    margin: "auto"
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
        </div>
    );
}

