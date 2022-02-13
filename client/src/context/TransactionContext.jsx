import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAddress, ContractABI } from "../utils/constants";
import SHA256 from "../utils/sha256";

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
    const [transactions, setTransactions] = useState([]);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    const getAllTransactions = async () => {
        try {
            if (!ethereum) return alert('Please install MetaMask');
            const transactionContract = geEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions();

            const structuredTransactions = availableTransactions.map(transaction => ({
                originator: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                link: transaction.link,
                message: transaction.message,
                keyword: transaction.keyword,
                source: transaction.source,
                slug: transaction.slug,
            }));

            setTransactions(structuredTransactions);
        } catch (error) {
            console.error(error);
        }
    }

    // Checks is the metamask wallet is connected
    const checkIfWalletConnected = async () => {
        try {
            if (!ethereum) return alert('Please install MetaMask');

            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);

                await getAllTransactions();

            } else {
                console.log("No account found.");
            }
            console.log(accounts);
        } catch (error) {
            console.error(e);
            throw new Error('No ethereum object.');
        }
    }

    const checkIfTransactionsExists = async () => {
        try {
            const transactionContract = geEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();

            window.localStorage.setItem('transactionCount', transactionCount);
        } catch (error) {
            console.error(error);
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

            const originatorValue = formData.originator == '' ? currentAccount : formData.originator;

            const slug = SHA256(JSON.stringify({
                link, originatorValue, source, message, keyword
            }));

            // await ethereum.request({ method: 'eth_' });
            const transactionHash = await transactionContract.addToBlockchain(link, originatorValue, source, message, keyword, slug);

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();

            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());

            window.location.reload();
        } catch (error) {
            console.error(error);
            throw new Error('No ethereum object.');
        }
    }

    useEffect(() => {
        checkIfWalletConnected();
        checkIfTransactionsExists();
    }, []);


    return (
        <TransactionContext.Provider value={{ checkIfWalletConnected, checkIfTransactionsExists, transactionCount, connectWallet, currentAccount, formData, setFormData, sendTransaction, handleChange, transactions, isLoading, getAllTransactions }}>
            {children}
        </TransactionContext.Provider>
    );
}