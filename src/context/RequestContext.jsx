import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import ERC20ContractAbi from '@openzeppelin/contracts/build/contracts/ERC20.json';

import { useWeb3React } from '@web3-react/core';

export const RequestContext = React.createContext();


export const RequestProvider = ({ children }) => {
  const { library, activate, account, active } = useWeb3React();
  const [contract, setContract] = useState();




  useEffect(() => {
    if (account) {
      const signer = library.getSigner();
      // const contract = new ethers.Contract(
      //   VoucherAddress.address,
      //   VoucherAbi.abi,
      //   signer
      // );
      setContract(contract);
    }
  }, [account]);
  return (
    <RequestContext.Provider
      value={{  }}>
      {children}
    </RequestContext.Provider>)

}