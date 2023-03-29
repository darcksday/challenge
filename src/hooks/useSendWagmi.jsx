import { useState, useEffect, useContext } from "react";
import { usePrepareSendTransaction, useSendTransaction } from "wagmi";
import useAlert from "./useAlert";
import { TransactionContext } from "../context/TransactionContext";

const useWriteWagmi = () => {
  const { setTx } = useContext(TransactionContext)


  const DEFAULT_CONF = {
    // enabled: true,
  }
  let callAlert = useAlert();
  let [config, setConfig] = useState(DEFAULT_CONF);

  const { config: prepare, status: prepStatus } = usePrepareSendTransaction({
    request: config,
    onError: ({ message }) => {

      console.log('onError message', message);
    },
  });


  const { data: tx, sendTransaction: callReq } = useSendTransaction({
    ...prepare,
    onSuccess: (tx) => {
      callAlert(`Deposit founds `, null, tx.hash);
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