import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import useAlert from '../hooks/useAlert';
import { useSnackbar } from 'notistack';

export const RequestContext = React.createContext();


export const RequestProvider = ({ children }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const DEFAULT_CONF = {
    enabled: false,
    functionName: null,
    args: null,
  }
  let [transactions, setTransactions] = useState([]);
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


  const { isSuccess: txSuccess, error: txError, hash,isLoading } = useWaitForTransaction({
    hash: tx?.hash,
    onError: error => {
      closeSnackbar(hash)
      callAlert('Transaction failed', 'error')
      console.log('is err', error)
    },
    onSuccess: data => {
      closeSnackbar(hash)
      callAlert(`Success! Tx hash: ${data.transactionHash}`, 'success')

    },
  });


  useEffect(() => {
    if (prepStatus === 'success') {
      callReq?.()
      setConfig(DEFAULT_CONF);

    }

  }, [prepStatus]);

  useEffect(() => {
    //set enabled if is function name TODO:: on validate
    if (config['functionName'] && config['enabled'] === false) {
      // setConfig({ ...config, 'enabled': true });
    }
    //
  }, [config]);


  return (
    <RequestContext.Provider
      value={{ config, setConfig, tx, txSuccess, txError, transactions, setTransactions,isLoading }}>
      {children}
    </RequestContext.Provider>)

}