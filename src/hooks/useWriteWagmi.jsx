import { useState, useEffect } from "react";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { ethers } from "ethers";
import { useSnackbar } from "notistack";
import useAlert from "./useAlert";
import { create } from 'zustand'

const useWriteWagmi = () => {



  const DEFAULT_CONF = {
    enabled: false,
    functionName: null,
    args: null,
  }
  let callAlert = useAlert();
  let [config, setConfig] = useState(DEFAULT_CONF);
  let snackbarId;
  const { config: prepare, status: prepStatus } = usePrepareContractWrite({
    ...config,
    overrides: {
      value: config['ether'] ? ethers.utils.parseEther(config['ether']) : undefined,
    },
    onSuccess: (res) => {
      console.log(config);
    },


    onError: ({ message }) => {

      console.log('onError message', message);
    },
  });


  const { data: tx, write: callReq } = useContractWrite({
    ...prepare,
    onSuccess: ({ hash }) => {




      snackbarId = callAlert(`Transaction function: (${config.functionName}) `, null, hash);


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