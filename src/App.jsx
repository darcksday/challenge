import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation ,useNavigate} from "react-router-dom";
import { Home } from './pages/Home';
import { MainLayout } from './components/layout/MainLayout';
import { useAccount, useConnect, useDisconnect, useSwitchNetwork } from 'wagmi'
import { CreateCustom } from './pages/custom/CreateCustom';
import { useContext, useEffect, useState } from 'react';
import CustomList from './pages/custom/CustomList';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { CreatePrice } from "./pages/price/CreatePrice";
import PriceList from "./pages/price/PriceList";
import { ViewCustom } from "./pages/custom/ViewCustom";
import { ViewPrice } from "./pages/price/ViewPrice";

const App = () => {
  const { address } = useAccount()
  const { openConnectModal } = useConnectModal();
  const navigate=useNavigate();
  const ProtectedRoute = ({ children }) => {
    if (!address) {
      setTimeout(() => {
        openConnectModal();
      }, 300)
      return <Navigate to="/" replace />;
    }

    return <Outlet />;
  };



  useEffect(()=>{
    if (address){
      navigate('/custom/list')
    }

  },[address])



  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>

          <Route path="custom/">
            <Route path="create" element={<CreateCustom />} />
            <Route path="view/:id" element={<ViewCustom />} />
            <Route path="list" element={<CustomList />} />
            </Route>


          <Route path="price/">
            <Route path="create" element={<CreatePrice />} />
            <Route path="view/:id" element={<ViewPrice />} />
            <Route path="list" element={<PriceList />} />
          </Route>


          <Route path="my/">
            <Route path="view/:id" element={<ViewPrice />} />

          </Route>


          {/*<Route path="challenges/:id/messages1/:address" element={<Challenge />} />*/}
          {/*<Route path="challenges/:id/messages2/:address" element={<Challenge />} />*/}
        </Route>
      </Route>
    </Routes>

  )
}


export default App
