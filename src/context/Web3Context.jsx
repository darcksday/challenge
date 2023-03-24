import React, { useEffect, useState } from "react";
import { ethers, BigNumber } from 'ethers';
import {
  WagmiConfig,
  createClient,
  configureChains,
} from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { InjectedConnector } from 'wagmi/connectors/injected'

import { polygonMumbai, goerli } from 'wagmi/chains'

import { publicProvider } from 'wagmi/providers/public'
import { SnackbarProvider } from 'notistack';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { TransactionProvider } from "./TransactionContext";
import { GaslessOnboarding } from "@gelatonetwork/gasless-onboarding";
import { GelatoTxProvider } from "./GelatoTxContext";

export const Web3Context = React.createContext();
export const Web3Provider = ({ children }) => {

  const [gelato, setGelato] = useState(false);


  // const localChain = {
  //   id: 31337,
  //   name: 'Local',
  //   network: 'Local',
  //   nativeCurrency: {
  //     decimals: 18,
  //     name: 'Local',
  //     symbol: 'GO',
  //   },
  //   rpcUrls: {
  //     default: 'http://localhost:8545',
  //   },
  //   blockExplorers: {
  //     default: { name: 'SnowTrace', url: 'https://etherscan.io' },
  //   },
  //   testnet: false,
  // }


  const { chains, provider } = configureChains([
    polygonMumbai, goerli
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
    domains: ["http://localhost:1234/"],

    chain: {
      id: polygonMumbai.id,
      rpcUrl: polygonMumbai.rpcUrls.default.http[0],
    },
    openLogin: {
      redirectUrl: `http://localhost:1234/`,
    },

  };
  const initGelato = async () => {
    const onboarding = new GaslessOnboarding(
      loginConfig,
      gaslessWalletConfig
    );
    await onboarding.init();
    setGelato(onboarding);

  }


  useEffect(() => {
    initGelato();

  }, [])

  // useEffect(() => {
  //
  // }, [gelato])


  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>

        <SnackbarProvider autoHideDuration={8000} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                          maxSnack={5}>
          <Web3Context.Provider value={{ gelato }}>
            <TransactionProvider>
              <GelatoTxProvider>
                {gelato && children}
              </GelatoTxProvider>
            </TransactionProvider>
          </Web3Context.Provider>

        </SnackbarProvider>
      </RainbowKitProvider>
    </WagmiConfig>

  )

}