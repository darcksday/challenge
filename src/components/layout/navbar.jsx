import { useState, useEffect } from "react";
import logopng from '/src/assets/img/logo2.png'
import {
  Navbar as MTNavbar,
  MobileNav,
  IconButton, MenuList, MenuItem, MenuHandler, Menu, Button,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { LoginButton } from "../my/LoginButton";

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
      }  mb-0 flex list-none flex-col gap-2  text-inherit transition-all justify-center  lg:flex-row lg:gap-4`}
    >


      <li className="flex px-2">
        <Link to={'/'}>
          <span className={navbarItemClasses}>
            <i className="material-icons mr-2 !text-base opacity-60">
              home
            </i>
            <span>Home</span>
          </span>
        </Link>
      </li>

      <Menu>
        <MenuHandler>
          <li className="flex px-2">

           <span className={navbarItemClasses}>
            <i className=" material-icons  mr-2 !text-base opacity-60">
              insert_chart
            </i>
            <span>Bets Market</span>
          </span>

          </li>
        </MenuHandler>
        <MenuList>
          <MenuItem>

            <Link to={'/price'}>
          <span className={navbarItemClasses}>
            <i className="material-icons mr-2 !text-base opacity-60">
              price_change
            </i>
            <span>Price Prediction</span>
          </span>
            </Link>

          </MenuItem>
          <MenuItem>

            <Link to={'/custom'}>
          <span className={navbarItemClasses}>
            <i className="material-icons mr-2 !text-base opacity-60">
              text_snippet
            </i>
            <span>Custom Bets</span>
          </span>
            </Link>

          </MenuItem>
        </MenuList>
      </Menu>


      <Menu>
        <MenuHandler>
          <li className="flex px-2">

           <span className={navbarItemClasses}>
            <i className=" material-icons  mr-2 !text-base opacity-60">
              account_circle
            </i>
            <span>My Bets</span>
          </span>

          </li>
        </MenuHandler>
        <MenuList>
          <MenuItem>

            <Link to={'/my/price'}>
          <span className={navbarItemClasses}>
            <i className="material-icons mr-2 !text-base opacity-60">
              price_change
            </i>
            <span>My Price Prediction</span>
          </span>
            </Link>

          </MenuItem>
          <MenuItem>

            <Link to={'/my/custom'}>
          <span className={navbarItemClasses}>
            <i className="material-icons mr-2 !text-base opacity-60">
              text_snippet
            </i>
            <span>My Custom Bets</span>
          </span>
            </Link>

          </MenuItem>
        </MenuList>
      </Menu>


    </ul>


  );

  return (
    <div className="z-[5]   my-4 flex w-full max-w-full max-w-full  sm:-right-5 items-center px-4  justify-center"
    >
      <MTNavbar className="py-0 pl-6 pr-5  shadow-2xl max-w-screen-2xl shadow-blue-gray-500/10" shadow={true}>
        <div
          className="flex w-full items-center justify-between  text-[#1A237E]"
        >
          <Link to={'/'} className="flex  mr-4 ">
            <img className="h-[3.8rem] mr-2 w-auto " src={logopng} alt="Challenge"/>
          </Link>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpen(!open)}
          >
            {open ? menuCloseIcon : menuOpenIcon}
          </IconButton>
          <div className="lg:base-auto hidden ml-[8rem]  items-center overflow-hidden lg:flex lg-max:max-h-0">
            {navbarMenu}
          </div>

          <LoginButton/>
        </div>

        <MobileNav open={open} className=" text-[#1A237E]">
          {navbarMenu}
        </MobileNav>
      </MTNavbar>
    </div>
  );
}
