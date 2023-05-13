import React, { createContext, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { networks } from "../utils/networks/index.js";

const WalletContext = createContext({});

function handleChainChanged(_chainId) {
  window.location.reload();
}

export function WalletProvider({ children }) {
  const { ethereum } = window;
  const [currentAccount, setCurrentAccount] = useState(null);
  const [network, setNetwork] = useState(null);
  const [loading, setLoading] = useState(null);
  const [errorStatus, setErrorStatus] = useState(-1);
  const history = useHistory();

  const connectWallet = useCallback(async () => {
    try {
      if (!ethereum) {
        setCurrentAccount(null);
        setErrorStatus(1);
        return;
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const chainId = await ethereum.request({ method: "eth_chainId" });
        setNetwork(networks[chainId]);
        ethereum.on("chainChanged", handleChainChanged);
        setCurrentAccount(accounts[0]);
      } else {
        setCurrentAccount(null);
        setErrorStatus(0);
      }
    } catch (error) {
      setCurrentAccount(null);
      setErrorStatus(2);
      console.error(error);
    }
    setLoading(false);
  }, [ethereum]);

  const connect = async () => {
    //connect wallet => like login to get read-only access to user's wallet
    try {
      if (!ethereum) {
        setCurrentAccount(null);
        setErrorStatus(1);
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length !== 0) {
        setCurrentAccount(accounts[0]);
      } else {
        setCurrentAccount(null);
        setErrorStatus(0);
      }
    } catch (error) {
      setCurrentAccount(null);
      setErrorStatus(2);
      console.error(error);
    }
  };

  const checkIfWalletIsConnected = useCallback(async () => {
    // checks if metamask installed
    if (!ethereum) {
      setCurrentAccount(null);
      setErrorStatus(1);
      return;
    }

    //check if we are authorized to access user's wallet
    const accounts = await ethereum.request({ method: "eth_accounts" });

    //grab 1st account if we are authorized
    if (accounts.length !== 0) {
      const account = accounts[0];
      setCurrentAccount(account);
    } else {
      setCurrentAccount(null);
      setErrorStatus(0);
    }
  }, [ethereum]);

  const accountChange = useCallback(() => {
    if (ethereum) ethereum.on("accountsChanged", handleChainChanged);
  }, [ethereum]);

  useEffect(() => {
    connectWallet();
    checkIfWalletIsConnected();
    accountChange();
    return () => {
      if (ethereum) {
        ethereum.removeListener("accountsChanged", handleChainChanged);
      }
    };
  }, [
    connectWallet,
    checkIfWalletIsConnected,
    history,
    ethereum,
    accountChange,
  ]);

  return (
    <WalletContext.Provider
      value={{
        currentAccount,
        network,
        setNetwork,
        loading,
        errorStatus,
        connectWallet: connect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export default WalletContext;
