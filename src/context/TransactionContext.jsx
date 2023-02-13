import React, { useEffect, useState } from "react";
import useAlert from "../hooks/useAlert";
import { useSnackbar } from "notistack";
import { useWaitForTransaction } from "wagmi";

export const TransactionContext = React.createContext();
export const TransactionProvider = ({ children }) => {
  const [tx, setTx] = useState(false);
  // const [txSuccess, setTxSuccess] = useState(false);
  const [txs, setTxs] = useState({});

  let callAlert = useAlert();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();


  const { isSuccess: txSuccess, error: txError, hash, isLoading } = useWaitForTransaction({
    hash: tx?.hash,
    onError: error => {

      closeSnackbar(hash)
      callAlert('Transaction failed', 'error')
      console.log('is err', error)
    },
    onSuccess: data => {
      closeSnackbar(data.transactionHash)
      callAlert(`Success! Tx hash: ${data.transactionHash}`, 'success');


    },
  });


  useEffect(() => {
    if (tx && tx.hash) {
      console.log(txs);
      setTxs(prevState => ({
          ...prevState,
          [tx.hash]: tx,
        })
      )
    }

  }, [tx])


  return (
    <TransactionContext.Provider
      value={{ tx, setTx, txError, isLoading, txs, txSuccess }}>
      {children}
    </TransactionContext.Provider>

  )

}