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

import { ConnectKitProvider } from 'connectkit';
import { publicProvider } from 'wagmi/providers/public'
import { SnackbarProvider } from 'notistack';

export const Web3Context = React.createContext();
export const Web3Provider = ({ children }) => {


  const [
    CHAIN_ID,
    CHAIN_NAME,
    RPC_URL,
    EXPLORER_URL,
    TOKEN_SYMBOL,
    TOKEN_DECIMALS
  ] = [import.meta.env.V_CHAIN_ID, import.meta.env.V_CHAIN_NAME, import.meta.env.V_RPC_URL, import.meta.env.V_EXPLORER_URL, import.meta.env.V_TOKEN_SYMBOL, import.meta.env.V_TOKEN_DECIMALS];
  const evmosChain = {
    id: parseInt(CHAIN_ID),
    name: CHAIN_NAME,
    network: CHAIN_NAME,
    nativeCurrency: {
      decimals: TOKEN_DECIMALS,
      name: CHAIN_NAME,
      symbol: TOKEN_SYMBOL,
    },
    rpcUrls: {
      default: RPC_URL,
    },
    blockExplorers: {
      default: { name: 'SnowTrace', url: EXPLORER_URL },
    },
    testnet: false,
  }


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
    chain.mainnet, chain.polygon, evmosChain, localChain
  ], [
    publicProvider(),
  ])


  // Set up client
  const client = createClient({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      new InjectedConnector({ chains }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
        },
      }),
    ],
    provider,
    // webSocketProvider,
  })
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <SnackbarProvider autoHideDuration={8000} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                          maxSnack={5}>
          <Web3Context.Provider
            value={{}}>
            {children}
          </Web3Context.Provider>
        </SnackbarProvider>
      </ConnectKitProvider>
    </WagmiConfig>

  )

}