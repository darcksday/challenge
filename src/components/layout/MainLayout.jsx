import { Outlet, Link, useLocation } from "react-router-dom";
import { Navbar } from './navbar';
import Footer from './footer';
import { styled } from '@mui/material/styles';
import { Dashboard } from './dasbord/Dashboard';


export const MainLayout = () => {
  const location = useLocation();
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


  return (<>
      <div className="flex flex-col  h-screen bg-gray-100  bg-[url('/src/assets/img/bg-header.jpg')]  bg-cover bg-center bg-no-repeat ">
        <div className="flex justify-between">
          {(location.pathname !== '/') && (
            <Dashboard />
          )}


          <div className="flex-row w-[100%]">
            <Navbar />


            <main className="flex-auto">
              <MainStyle className="max-w-[100%]">
                <Outlet />
              </MainStyle>
            </main>
          </div>

        </div>
        <Footer />
      </div>

    </>
  )


}
