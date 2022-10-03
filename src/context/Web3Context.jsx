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


  // const [
  //   CHAIN_ID,
  //   CHAIN_NAME,
  //   RPC_URL,
  //   EXPLORER_URL,
  //   TOKEN_SYMBOL,
  //   TOKEN_DECIMALS
  // ] = [import.meta.env.V_CHAIN_ID, import.meta.env.V_CHAIN_NAME, import.meta.env.V_RPC_URL, import.meta.env.V_EXPLORER_URL, import.meta.env.V_TOKEN_SYMBOL, import.meta.env.V_TOKEN_DECIMALS];

  const auroraTestnet = {
    /** ID in number form */
    id: 1313161555,
    /** Human-readable name */
    name: 'Aurora Testnet',
    /** Internal network name */
    network: 'auroratest',
    /** Currency used by chain */
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    /** Collection of RPC endpoints */
    rpcUrls: {
      infura:
        'https://aurora-testnet.infura.io/v3'
    },
    testnet: true
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
    localChain, chain.mainnet, chain.polygon, chain.optimism,
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