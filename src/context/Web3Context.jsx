import React, { useEffect, useState } from "react";
import { configureChains, createClient, WagmiConfig, } from 'wagmi'

import { polygonMumbai as defaultChain } from 'wagmi/chains'

import { publicProvider } from 'wagmi/providers/public'
import { SnackbarProvider } from 'notistack';
import { getDefaultWallets, } from '@rainbow-me/rainbowkit';
import { TransactionProvider } from "./TransactionContext";
import { GaslessOnboarding } from "@gelatonetwork/gasless-onboarding";
import { GelatoTxProvider } from "./GelatoTxContext";

export const Web3Context = React.createContext();
export const Web3Provider = ({ children }) => {

  const [gelato, setGelato] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const { chains, provider } = configureChains([
    defaultChain
  ], [
    publicProvider(),
  ]);
  const { connectors } = getDefaultWallets({
    appName: 'Web3 Challenge',
    chains
  });

  // Set up client
  const client = createClient({
    autoConnect: true,
    connectors,
    provider,
    // webSocketProvider,
  });


  const gaslessWalletConfig = { apiKey: process.env.GELATO_API_KEY };
  const loginConfig = {
    domains: [process.env.DOMAIN],

    chain: {
      id: defaultChain.id,
      rpcUrl: defaultChain.rpcUrls.default.http[0],
    },
    openLogin: {
      redirectUrl: process.env.REDIRECT_URL,
    },

  };
  console.log(loginConfig);
  const initGelato = async () => {
    const onboarding = new GaslessOnboarding(
      loginConfig,
      gaslessWalletConfig
    );
    await onboarding.init();
    setGelato(onboarding);

    if (onboarding.getProvider()) {

      initAuthInfo(onboarding);

    }


  }


  const login = async () => {
    await gelato.login()
    initAuthInfo(gelato);


  };


  const logout = () => {
    gelato.logout().then((res) => {
      setIsAuth(false);


    });
  }
  const initAuthInfo = async (onboarding) => {
    const info = await onboarding.getUserInfo();
    info['address'] = onboarding.getGaslessWallet().getAddress();
    setUserInfo(info);
    setIsAuth(true);
  }

  useEffect(() => {
    initGelato();


  }, [])

  // useEffect(() => {
  //
  // }, [gelato])


  return gelato && (

    <WagmiConfig client={client}>

      <SnackbarProvider autoHideDuration={8000} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                        maxSnack={5}>
        <Web3Context.Provider value={{ gelato, chains, login, logout, isAuth, userInfo }}>
          <TransactionProvider>
            <GelatoTxProvider>
              {children}
            </GelatoTxProvider>
          </TransactionProvider>
        </Web3Context.Provider>

      </SnackbarProvider>
    </WagmiConfig>

  )

}