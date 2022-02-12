import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAddress, ContractABI } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const geEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, ContractABI, signer);

    console.log({
        provider: provider,
        signer: signer,
    });
}

export const TransactionProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState('');


    const checkIfWalletConnected = async () => {
        try {
            if (!ethereum) return alert('Please install MetaMask');

            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);

                // getAllTransactions();

            } else {
                console.log("No account found.");
            }
            console.log(accounts);
        } catch (error) {
            console.error(e);
            throw new Error('No ethereum object.');
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert('Please install MetaMask');
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);

        } catch (e) {
            console.error(e);
            throw new Error('No ethereum object.');
        }
    }

    useEffect(() => {
        checkIfWalletConnected();
    }, []);


    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount }}>
            {children}
        </TransactionContext.Provider>
    );
}