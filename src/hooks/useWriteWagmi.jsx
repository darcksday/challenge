import { useState, useEffect, useContext } from "react";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { ethers } from "ethers";
import { useSnackbar } from "notistack";
import useAlert from "./useAlert";
import { create } from 'zustand'
import { TransactionContext } from "../context/TransactionContext";

const useWriteWagmi = () => {
  const { setTx } = useContext(TransactionContext)


  const DEFAULT_CONF = {
    enabled: false,
    functionName: null,
    args: null,
  }
  let callAlert = useAlert();
  let [config, setConfig] = useState(DEFAULT_CONF);
  const { config: prepare, status: prepStatus } = usePrepareContractWrite({
    ...config,
    overrides: {
      value: config['ether'] ? ethers.utils.parseEther(config['ether']) : undefined,
    },
    onError: ({ message }) => {

      console.log('onError message', message);
    },
  });


  const { data: tx, write: callReq } = useContractWrite({
    ...prepare,
    onSuccess: (tx) => {
      callAlert(`Transaction function: (${config.functionName}) `, null, tx.hash);
      setTx(tx)


    },
    onError: ({ message }) => {
      callAlert('Transaction failed', 'error')
      console.log('onError message', message);
    },
  });


  useEffect(() => {
    if (prepStatus === 'success') {
      callReq?.()
      setConfig(DEFAULT_CONF);

    }

  }, [prepStatus]);


  return { setConfig, tx };
};

export default useWriteWagmi;