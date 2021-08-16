import {WalletConnectConnector} from "@web3-react/walletconnect-connector";

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  1: "https://mainnet.infura.io/v3/84842078b09946638c03157f83405213",
};


export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  bridge: "https://bridge.walletconnect.org", // Required
  qrcode: true,
  pollingInterval: POLLING_INTERVAL
});


