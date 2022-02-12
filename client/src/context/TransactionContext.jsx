import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAddress, ContractABI } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const geEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, ContractABI, signer);
    return transactionContract;
}

export const TransactionProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({ link: '', originator: '', source: '', keyword: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    // Checks is the metamask wallet is connected
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

    // Connects the metamask wallet
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


    // Sends the transaction to the blockchain
    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert('Please install MetaMask');

            // get the data from the form....
            const { link, originator, source, keyword, message } = formData;
            const transactionContract = geEthereumContract();

            // await ethereum.request({ method: 'eth_' });
            const transactionHash = await transactionContract.addToBlockchain(link, originator, source, message, keyword);

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();

            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());
            
        } catch (error) {
            console.error(error);
            throw new Error('No ethereum object.');
        }
    }

    useEffect(() => {
        checkIfWalletConnected();
    }, []);


    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, sendTransaction, handleChange }}>
            {children}
        </TransactionContext.Provider>
    );
}