import { Outlet } from "react-router-dom";
import { Navbar } from './navbar';
import Footer from './footer';
import { styled } from '@mui/material/styles';
import { Dashboard } from './dasbord/Dashboard';


export const DashboardLayout = () => {
  const MainStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: 30,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  }));


  return (
    <div
      className="flex flex-col justify-between   h-screen bg-gray-100 h-[100%]  ">
      <div className="flex justify-between">
        <Dashboard/>


        <div className="flex-row w-[100%] ">
          <Navbar/>


          <main className="flex-auto">
            <MainStyle className="max-w-[100%]">
              <Outlet/>
            </MainStyle>

          </main>
        </div>

      </div>
      <Footer/>
    </div>


  )


}
