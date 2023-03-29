import { useCallback, useContext, useState } from 'react';
import {
  Avatar, CircularProgress,
  Divider,
  Typography,
} from '@mui/material';
import { ConnectButton, lightTheme } from "@rainbow-me/rainbowkit";
import ShortTextIcon from "@mui/icons-material/ShortText";
import { Button, Input } from "@material-tailwind/react";
import { Web3Context } from "../../context/Web3Context";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import useSendWagmi from "../../hooks/useSendWagmi";
import { TransactionContext } from "../../context/TransactionContext";

export const Deposits = () => {
  const { userInfo, chains } = useContext(Web3Context);
  const chain = chains[0]
  const nativeCurrency = chain.nativeCurrency;
  const [value, setValue] = useState('');
  const { address } = useAccount()

  const { setConfig } = useSendWagmi();
  const { isLoading } = useContext(TransactionContext);


  const handleChange = ({ target }) => {
    setValue(target.value);
  }


  const handleDeposit = () => {
    setConfig(
      {
        to: userInfo?.address,
        value: value ? ethers.utils.parseEther(value) : undefined,
      }
    );
  }

  return (<div className="mt-8  mx-auto w-[66%]">
      <div className="flex items-center justify-between w-full mb-6">
        <div className="flex items-center ">
          <Avatar className="mr-3" sx={{
            color: 'primary.main', bgcolor: 'primary.lighter'
          }}>
            <ShortTextIcon/>
          </Avatar>
          <Typography variant={"subtitle1"}>Deposit via Wallet</Typography>
        </div>
        <div className="relative flex  max-w-[24rem]">
          {address && (<>
            <Input
              step="0.1"
              min="0.1"
              type="number"
              label={`In ${nativeCurrency.symbol}`}
              value={value}
              onChange={(event) => handleChange(event)}
              className="pr-20"
              containerProps={{
                className: "min-w-0",
              }}
            />

            {isLoading ?
              <CircularProgress/>
              :
              <Button
                disabled={!userInfo.address || !value}
                onClick={() => {
                  handleDeposit()
                }}
                size="sm"
                className="!absolute right-1 top-1 rounded"
              >
                Deposit
              </Button>}


          </>)}

        </div>
        <div className=" flex h-[42px] ">
          <ConnectButton theme={lightTheme({
            shadows: {
              connectButton: '...',
              walletLogo: '...',
            },
          })} showBalance={true} accountStatus="avatar"/>

        </div>

      </div>


      <div className="flex items-center justify-between w-full mb-6">
        <div className="flex items-center w-1/2">
          <Avatar className="mr-3" sx={{
            color: 'primary.main', bgcolor: 'primary.lighter'
          }}>
            <ShortTextIcon/>
          </Avatar>
          <Typography variant={"subtitle1"}>Deposit via Credit Card </Typography>
        </div>
        <div>
                <span className="h-[42px]">
            <Button size="sm" disabled>Soon</Button>

          </span>
        </div>
      </div>


      <Divider/>
    </div>
  );
};
