import React, { useEffect, useState } from "react";
import { ethers, BigNumber } from 'ethers';
import {
  WagmiConfig,
  createClient,
  chain,
  configureChains,
} from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { InjectedConnector } from 'wagmi/connectors/injected'

import { publicProvider } from 'wagmi/providers/public'
import { SnackbarProvider } from 'notistack';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

export const Web3Context = React.createContext();
export const Web3Provider = ({ children }) => {


  const localChain = {
    id: 31337,
    name: 'Local',
    network: 'Local',
    nativeCurrency: {
      decimals: 18,
      name: 'Local',
      symbol: 'GO',
    },
    rpcUrls: {
      default: 'http://localhost:8545',
    },
    blockExplorers: {
      default: { name: 'SnowTrace', url: 'https://etherscan.io' },
    },
    testnet: false,
  }


  const { chains, provider } = configureChains([
    localChain, chain.polygonMumbai,chain.goerli
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
  })
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>

        <SnackbarProvider autoHideDuration={8000} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                          maxSnack={5}>
          <Web3Context.Provider
            value={{}}>
            {children}
          </Web3Context.Provider>
        </SnackbarProvider>
      </RainbowKitProvider>
    </WagmiConfig>

  )

}