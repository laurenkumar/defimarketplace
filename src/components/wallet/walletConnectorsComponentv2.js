import React from "react";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import {apiGetAccountAssets} from "./chainsHelpers/eth.js";
import Modal from "react-modal";

function BalanceComponent(props) {

    if (props.balance !== null && props.balance !== undefined)
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
                    <span>{props.balance}</span>
                    <span>{props.currency}</span>
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
    const [result, setResult] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(false);


    function connectWallet() {
        if (connector !== null) {
            connector.killSession();
            console.log("old session killed!")
        }
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

            // Get provided accounts and chainId
            const {accounts, chainId} = payload.params[0];
            setAccounts(accounts);
            setChainId(chainId);
            loadAccountDetails(accounts, chainId).then(
                it => setConnected(true)
            )
        });

        connector2.on("session_update", (error, payload) => {
            if (error) {
                throw error;
            }
            // Get updated accounts and chainId
            const {accounts, chainId} = payload.params[0];
        });

        connector2.on("disconnect", (error, payload) => {
            if (error) {
                throw error;
            }
            setConnected(false);
            setConnector(null);
        });

        setConnector(connector2);
    }

    function disconnectWallet() {
        connector.killSession();
    }

    function toggleDetails() {
        setIsOpen(!isOpen)
    }

    function loadAccountDetails(accounts, chainId) {
        return apiGetAccountAssets(accounts, chainId).then(
            result => {
                setResult(result);
                console.log(result);
                return Promise.resolve();
            }
        ).catch(error => Promise.reject(error));
    }


    if (!connected)
        return (
            <button className="buttonPrimary" onClick={connectWallet}>Connect wallet v2</button>
        )
    else if (result !== null) {
        const balancesList = result.map((it) =>
            <BalanceComponent key={it.symbol} balance={(it.balance / Math.pow(10, it.decimals)).toString()}
                              currency={it.symbol}/>
        );
        return (
            <div>
                <button className="buttonInfo" onClick={toggleDetails}>Open wallet</button>
                <Modal
                    isOpen={isOpen}
                    contentLabel="Wallet"
                    style={{
                        overlay: {
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(255, 255, 255, 0.75)'
                        },
                        content: {
                            position: 'relative',
                            top: '10%',
                            left: '74%',
                            height: '40%',
                            width: '23%',
                            border: '1px solid #ccc',
                            background: '#fff',
                            overflow: 'auto',
                            WebkitOverflowScrolling: 'touch',
                            borderRadius: '4px',
                            outline: 'none',
                            padding: '20px'
                        }
                    }}
                >
                    {balancesList}
                    <button className="buttonDanger" onClick={disconnectWallet}>Leave</button>
                </Modal>
            </div>
        );
    }

}

