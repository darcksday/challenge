import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Home } from './pages/Home';
import { MainLayout } from './components/layout/MainLayout';
import { useAccount, useConnect, useDisconnect, useSwitchNetwork } from 'wagmi'
import { CreateCustom } from './pages/custom/CreateCustom';
import { useContext, useEffect, useState } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { CreatePrice } from "./pages/price/CreatePrice";
import { ViewCustom } from "./pages/custom/ViewCustom";
import { ViewPrice } from "./pages/price/ViewPrice";
import { CustomList } from "./pages/custom/CustomList";
import { PriceList } from "./pages/price/PriceList";
import { MyCustomList } from "./pages/my/MyCustomList";
import { MyPriceList } from "./pages/my/MyPriceList";
import { DashboardLayout } from "./components/layout/DashboardLayout";


const App = () => {

  const { address } = useAccount()
  const { openConnectModal } = useConnectModal();
  const ProtectedRoute = ({ children }) => {
    if (!address) {
      setTimeout(() => {
        openConnectModal();
      }, 300)
      return <Navigate to="/" replace/>;
    }

    return <Outlet/>;
  };


  useEffect(() => {
  }, [])


  return (
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path="/" element={<Home/>}/>
      </Route>


      <Route element={<DashboardLayout/>}>
        <Route element={<ProtectedRoute/>}>

          <Route path="custom/" element={<CustomList/>}/>
          <Route path="custom/create" element={<CreateCustom/>}/>
          <Route path="custom/:id" element={<ViewCustom/>}/>

          <Route path="price" element={<PriceList/>}/>
          <Route path="price/create" element={<CreatePrice/>}/>
          <Route path="price/:id" element={<ViewPrice/>}/>


          <Route path="my/">
            <Route path="price" element={<MyPriceList/>}/>
            <Route path="custom" element={<MyCustomList/>}/>
          </Route>


          {/*<Route path="challenges/:id/messages1/:address" element={<Challenge />} />*/}
          {/*<Route path="challenges/:id/messages2/:address" element={<Challenge />} />*/}

        </Route>
      </Route>
    </Routes>

  )
}


export default App
