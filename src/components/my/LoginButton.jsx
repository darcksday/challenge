import { Web3Context } from "../../context/Web3Context";
import { useBalance, useEnsAvatar } from "wagmi";
import { useContext } from "react";
import { Avatar, Button, Menu, MenuHandler, MenuItem, MenuList, Tooltip, Typography } from "@material-tailwind/react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { shortAddress } from "../../utilits";
import { Link } from "react-router-dom";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export const LoginButton = ({}) => {

  const { gelato, login, logout, isAuth, userInfo } = useContext(Web3Context);
  const { data, isError, isSuccess, isLoading } = useBalance({
    cacheTime: 4000,
    watch: true,
    address: userInfo.address,
  });


  return (
    <div className="flex">


      {isAuth && !isLoading ? (
        <>
          <Menu>
            <MenuHandler>
              <Button size="sm" color="white" className="border border-gray-150 rounded-r-none flex items-center gap-2 ">
                {data.formatted} {data.symbol}
                <Avatar className="h-6 w-6 "
                        src={(userInfo?.profileImage) ?? `https://avatars.dicebear.com/api/jdenticon/${userInfo.address}.svg`}
                        alt="ENS Avatar"/>
                <KeyboardArrowDownIcon
                  className="h-5 w-5 transition-transform "
                />


              </Button>
            </MenuHandler>
            <MenuList>
              <MenuItem onClick={() => navigator.clipboard.writeText(userInfo.address)} className="flex  items-center justify-center gap-2">
                {/*<PermIdentityIcon strokeWidth={2} className="h-4 w-4"/>*/}

                <Typography variant="h6" className="font-normal">
                  {shortAddress(userInfo.address)}
                </Typography>
                <Tooltip content="Click to Copy Address">

                  <ContentCopyIcon strokeWidth={2} className="h-4 w-4 "/>
                </Tooltip>

              </MenuItem>

              <hr className="my-1 border-blue-gray-50"/>
              <Link to={'/my/deposit'}>
                <MenuItem className="flex items-center gap-2">
                  <AccountBalanceWalletIcon strokeWidth={2} className="h-4 w-4"/>
                  <Typography variant="small" className="font-normal">
                    Deposit
                  </Typography>
                </MenuItem>
              </Link>

              <Link to={'/my/price'}>
                <MenuItem className="flex items-center gap-2">
                  <ContentCopyIcon strokeWidth={2} className="h-4 w-4"/>
                  <Typography variant="small" className="font-normal">
                    My Predictions
                  </Typography>
                </MenuItem>
              </Link>


              <hr className="my-1 border-blue-gray-50"/>
              <MenuItem onClick={() => {
                logout()
              }} className="flex items-center gap-2 ">
                <PowerSettingsNewIcon strokeWidth={2} className="h-4 w-4"/>
                <Typography variant="small" className="font-normal">
                  Sign Out
                </Typography>
              </MenuItem>
            </MenuList>

          </Menu>

          <Button className="rounded-l-none" size="sm">
            <Link to={'/my/deposit'}>
              Deposit
            </Link>
          </Button>

        </>

      ) : (
        <Button variant="text" onClick={() => {
          login()
        }} className="h-[42px]">

          Login
        </Button>)
      }

    </div>
  );
}