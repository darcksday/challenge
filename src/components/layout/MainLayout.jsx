import { Outlet, Link, useLocation } from "react-router-dom";
import { Navbar } from './navbar';
import Footer from './footer';
import { styled } from '@mui/material/styles';
import { Dashboard } from './dasbord/Dashboard';


export const MainLayout = () => {


  return (
    <div
      className="flex flex-col justify-between   h-screen bg-gray-100 h-[100%]  ">
      <div className="flex justify-between">


        <div className="flex-row w-[100%] ">
          <Navbar/>
          <main className="flex-auto">
            <Outlet/>
          </main>
        </div>

      </div>
      <Footer/>
    </div>


  )


}
