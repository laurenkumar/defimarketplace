import axios from "axios";

const ethsApi = axios.create({
    baseURL: "https://ethereum-api.xyz",
    timeout: 30000, // 30 secs
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export async function apiGetAccountAssets(address, chainId) {
    const response = await ethsApi.get(`/account-assets?address=${address}&chainId=${chainId}`);
    const {result} = response.data;
    return result;
}

export async function apiGetAccountTransactions(
    address,
    chainId,
) {
    const response = await ethsApi.get(`/account-transactions?address=${address}&chainId=${chainId}`);
    const {result} = response.data;
    return result;
}

export const apiGetAccountNonce = async (address, chainId) => {
    const response = await ethsApi.get(`/account-nonce?address=${address}&chainId=${chainId}`);
    const {result} = response.data;
    return result;
};

export const apiGetGasPrices = async () => {
    const response = await ethsApi.get(`/gas-prices`);
    const {result} = response.data;
    return result;
};
