import { useState, useEffect, useRef, useContext } from "react";
import challengeSvg from '/src/assets/img/chalange.svg'
import {
  Navbar as MTNavbar,
  MobileNav,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Avatar
} from "@material-tailwind/react";
import { ConnectKitButton } from "connectkit";
import { Link } from 'react-router-dom';

export const Navbar = ({}) => {


  const [open, setOpen] = useState(false);
  const navbarItemClasses =
    "flex items-center px-1 py-2 font-normal transition-all duration-250 text-size-sm text-current font-light lg:px-2 cursor-pointer";

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth >= 960 && setOpen(false);
    });
  }, []);


  const menuOpenIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );

  const menuCloseIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className="h-6 w-6"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  const navbarMenu = (
    <ul
      className={`${
        open ? "mt-4" : ""
      } mb-0 flex list-none flex-col gap-2 pl-0 text-inherit transition-all lg:ml-auto lg:flex-row lg:gap-4`}
    >


      <li className="flex">
        <Link to={'/'}>
          <span className={navbarItemClasses}>
            <i className="material-icons mr-2 !text-base opacity-60">
              home
            </i>
            <span>Home</span>
          </span>
        </Link>
      </li>

      <li className="flex">
        <Link to={'/challenges'}>
          <span className={navbarItemClasses}>
            <i className="material-icons mr-2 !text-base opacity-60">
              home
            </i>
            <span>Challenges</span>
          </span>
        </Link>

      </li>


      <li className="flex">
          <span className="max-h-[70px]">

            <ConnectKitButton showBalance={true} />


          </span>
      </li>


    </ul>
  );

  return (
    <div className="z-[5]   my-4 flex w-full max-w-full max-w-full  sm:-right-5 items-center px-4  justify-center"
    >
      <MTNavbar className="py-4 pl-6 pr-5 lg:py-2  shadow-2xl max-w-screen-2xl shadow-blue-gray-500/10" shadow={true}>
        <div
          className={`flex w-full items-center !justify-between text-[#1A237E]`}
        >
          <a className="flex items-center  text-size-sm mr-4 whitespace-nowrap font-bold text-inherit lg:ml-0">
            <img className="h-11 mr-2 w-auto mb-2" width="50" src={challengeSvg} alt="Challenge" />
            <span>Web3 Challenge</span>
          </a>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpen(!open)}
          >
            {open ? menuCloseIcon : menuOpenIcon}
          </IconButton>
          <div className="lg:base-auto hidden flex-grow basis-full items-center overflow-hidden lg:flex lg-max:max-h-0">
            {navbarMenu}
          </div>
        </div>

        <MobileNav open={open} className="text-[#1A237E]">
          {navbarMenu}
        </MobileNav>
      </MTNavbar>
    </div>
  );
}
