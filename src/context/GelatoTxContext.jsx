import React, { useContext, useEffect, useState } from "react";
import { Web3Context } from "./Web3Context";
import useAlert from "../hooks/useAlert";
import { useSnackbar } from "notistack";
import { ethers } from "ethers";
import { useWaitForTransaction } from "wagmi";

export const GelatoTxContext = React.createContext();
export const GelatoTxProvider = ({ children }) => {
  const { gelato } = useContext(Web3Context);
  const [tx, setTx] = useState(false);
  const [txSuccess, setTxSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const DEFAULT_CONF = {
    functionName: null,
    args: null,
    enable: false,
  }
  let callAlert = useAlert();
  const { closeSnackbar } = useSnackbar();

  let [config, setConfig] = useState(DEFAULT_CONF);


  const clearConfig = () => {
    setConfig(DEFAULT_CONF);
    setTxSuccess('');

  }

  const createTask = async () => {

    try {
      setIsLoading(true);
      callAlert(`Create Gelato task: (${config.functionName}) `, null, config.functionName);

      let iface = new ethers.utils.Interface(config.abi);
      let fData = iface.encodeFunctionData(config.functionName, config.args)


      let data = await gelato.getGaslessWallet().sponsorTransaction(
        config.address,
        fData,
        config['ether'] ? ethers.utils.parseEther(config['ether']) : undefined);
      // closeSnackbar(config.functionName);
      callAlert(`Task hash: ${data.taskId} `, null, data.taskId);


      watchTask(data);

    } catch (e) {

      closeSnackbar();
      console.log(e);
      callAlert(e.message, 'error');
      setIsLoading(false);
      clearConfig();
    }


  }


  const watchTask = async (data) => {

    await new Promise(r => setTimeout(r, 500));
    let response = await fetch('https://relay.gelato.digital/tasks/status/' + data.taskId);
    response = await response.json();
    console.log('response', response);

    if (response['task'] && response['task']['transactionHash']) {
      closeSnackbar();
      let tx = [];

      tx = response['task'];
      tx['hash'] = tx['transactionHash'];
      callAlert(`Transaction confirmation: ${tx.hash}`, null, tx.hash);
      setTx(tx);


    } else {
      watchTask(data);
    }


  }


  const { error: txError, hash } = useWaitForTransaction({
    hash: tx?.hash,
    onError: error => {

      closeSnackbar(hash)
      callAlert('Transaction failed', 'error')
      console.log('is err', error)
    },

    onSuccess: async data => {
      closeSnackbar(data.transactionHash)
      setTxSuccess(data.transactionHash)
      callAlert(`Success: ${data.transactionHash}`, 'success');
      setIsLoading(false);
      await new Promise(r => setTimeout(r, 500));

      clearConfig();

    },
  });


  useEffect(() => {


    if (config.functionName && config.enable && isLoading === false) {
      createTask();
    }

    if (isLoading === true) {
      callAlert('Canceled - one transaction at a time', 'error')

    }


  }, [config]);

  return (
    <GelatoTxContext.Provider
      value={{ setTx, txError, tx, setConfig, txSuccess, isLoading, config,clearConfig }}>
      {children}
    </GelatoTxContext.Provider>

  )

}