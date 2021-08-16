import React from "react";
import {useWeb3React} from "@web3-react/core";
import {formatEther} from "@ethersproject/units";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

function BalanceComponent(props) {
    const {account, library, chainId} = useWeb3React()
    const [balance, setBalance] = React.useState();
    React.useEffect(() => {
    }, [])


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


function AccountComponent(props) {
    const [account, setAccount] = React.useState();
    const [chainId, setChainId] = React.useState();

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
                    </span>
                </h3>
            </>
        );
    else
        return (<></>);
}


export function WalletConnectorsComponentv2() {
    const [connector, setConnector] = React.useState(null);
    const [connected, setConnected] = React.useState(false);
    const [accounts, setAccounts] = React.useState(null);
    const [chainId, setChainId] = React.useState(null);


    function connectWallet() {
        // Create a connector
        let connector2 = new WalletConnect({
            bridge: "https://bridge.walletconnect.org", // Required
            qrcodeModal: QRCodeModal,
        });

        // Check if connection is already established
        if (!connector2.connected) {
            console.log("create session");
            // create new session
            connector2.createSession();

        }

        connector2.on("connect", (error, payload) => {
            if (error) {
                throw error;
            }
            console.log("listener on");
            setConnected(true);
            // Get provided accounts and chainId
            const {accounts, chainId} = payload.params[0];
            console.log(accounts)
            console.log(payload);
        });

        connector2.on("session_update", (error, payload) => {
            if (error) {
                throw error;
            }
            console.log("session_update");
            // Get updated accounts and chainId
            const {accounts, chainId} = payload.params[0];
        });

        connector2.on("disconnect", (error, payload) => {
            if (error) {
                throw error;
            }
            setConnected(false);
            setConnector(null);
            console.log("disconnect");
        });

        setConnector(connector2);
    }

    function disconnectWallet() {
        connector.killSession();
    }


    return (
        !connected ?
            <button className="buttonPrimary" onClick={connectWallet}>Connect wallet v2</button> :
            <button className="buttonDanger" onClick={disconnectWallet}>Disconnect wallet</button>
    );
}

