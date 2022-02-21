import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const  { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contracABI, signer);

    console.log({
        provider,
        signer,
        transactionContract
    });
}

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount ] = useState("");
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: ''});
    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) {
                return alert("install Metamask!");
            };
            const accounts = await ethereum.request({method: 'eth_accounts'});
    
            if(accounts.length){
                setCurrentAccount(accounts[0]);
                
                // getAllTransactions();
            }else {
                console.log("No accounts found.");
            }
        } catch (error) {
            throw new Error("No ethereum object.");
        }
        
        console.log(accounts);
    }

    const connectWallet = async () => {
        console.log("connecting wallet...");
        try {
            if(!ethereum) {
                return alert("install Metamask!");
            };
            console.log("awaiting ethereum request accounts...");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log("accounts: ", accounts);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }

    const sendTransaction = async () => {
        try {
            if(!ethereum) {
                return alert("install Metamask!");
                // get the data from the form
            };
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount }}>
            {children}
        </TransactionContext.Provider>
    );
}