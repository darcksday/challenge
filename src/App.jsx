import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';

import { useWeb3React } from '@web3-react/core';
import { Web3Context } from './context/Web3Context';
import { RequestContext } from './context/RequestContext';

const App = () => {

  // url = (import.meta.env.V_BASE_URL) ? import.meta.env.V_BASE_URL : url;
  const { active, account, activate, deactivate, chainId } = useWeb3React();
  const { contract } = useContext(RequestContext);
  const { connectWeb3Wallets, isMetamaskInstalled } = useContext(Web3Context);
  const [tryConnect, setTryConnect] = useState(false);

  const PrivatePage = () => {

    if (!isMetamaskInstalled()) {
      return <>
        Please install <a href="https://metamask.io/" className="underline" target="_blank">Metamask</a> to connect your browser wallet.
      </>
    }

    if (!account && !tryConnect) {
      setTryConnect(true);
      connectWeb3Wallets(activate);
    }
    if (account && contract) {
      return <Outlet />;
    }

  }


  return (
    <BrowserRouter>
      <Routes>
        {/*<Route index element={<Home />} />*/}
        {/*<Route element={<PrivatePage />}>*/}
        {/*  <Route element={<Layout />}>*/}
        {/*    <Route path="vouchers" element={<Vouchers />} />*/}
        {/*    <Route path="claim/:id/:hash" element={<Claim />} />*/}
        {/*  </Route>*/}
        {/*</Route>*/}

      </Routes>
    </BrowserRouter>

  )
}

export default App
