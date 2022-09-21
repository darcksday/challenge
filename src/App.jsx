import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Home } from './pages/Home';
import { MainLayout } from './components/layout/MainLayout';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Create } from './pages/Create';
import { useModal } from "connectkit";
import { Web3Context } from './context/Web3Context';
import { useContext, useEffect, useState } from 'react';
import Challenges from './pages/Challenges';
import { DashboardLayout } from './components/layout/dasbord/DashboardLayout';
import { Challenge } from './pages/Challenge';

const App = () => {
  const { address } = useAccount()
  const { setOpen, open } = useModal()
  const { setBlocked, blocked } = useContext(Web3Context);

  const ProtectedRoute = ({ children }) => {
    if (!address && !open) {
      setTimeout(() => {
        setOpen(true);
      }, 300)
      return <Navigate to="/" replace />;
    }

    return <Outlet />;
  };


  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route element={<DashboardLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="create" element={<Create />} />
            <Route path="challenges" element={<Challenges />} />
            <Route path="challenges/:id" element={<Challenge />} />
          </Route>
        </Route>
      </Route>
    </Routes>

  )
}


export default App
