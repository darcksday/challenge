import { Outlet, Link } from "react-router-dom";
import { Navbar } from './navbar';
import Footer from './footer';


export const MainLayout = () => {


  return (<>
      <div className="flex flex-col  h-screen bg-gray-100 ">
        <Navbar />
        <main className="flex-auto bg-[url('/src/assets/img/bg-header.jpg')]  bg-cover bg-center bg-no-repeat py-10 lg:py-10">
          <Outlet />
        </main>
        <Footer />
      </div>

    </>
  )


}
