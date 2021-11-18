import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import ConnectWallet from './pages/connectWallet/ConnectWallet'
import HomePage from './pages/homePage/HomePage'

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [loadingWallet, setLoadingWallet] = useState(false);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Implement your connectWallet method here
   */
  const connectWallet = async () => {
    setLoadingWallet(true);
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);

      setLoadingWallet(false);
    } catch (error) {
      console.log(error)

      setLoadingWallet(false);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div>
      {!currentAccount 
        ? <ConnectWallet loadingWallet={loadingWallet} connectWallet={connectWallet} />
        : <HomePage currentAccount={currentAccount} />
      }
    </div>
  );
}

export default App;
