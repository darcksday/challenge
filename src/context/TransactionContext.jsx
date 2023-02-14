import React, { useEffect, useState } from "react";
import useAlert from "../hooks/useAlert";
import { useSnackbar } from "notistack";
import { useWaitForTransaction, useWatchPendingTransactions } from "wagmi";

export const TransactionContext = React.createContext();
export const TransactionProvider = ({ children }) => {
  const [tx, setTx] = useState(false);
  const [txSuccess, setTxSuccess] = useState('');
  // const [txs, setTxs] = useState([]);

  let callAlert = useAlert();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();


  const { error: txError, hash, isLoading } = useWaitForTransaction({
    hash: tx?.hash,
    onError: error => {

      closeSnackbar(hash)
      callAlert('Transaction failed', 'error')
      console.log('is err', error)
    },

    onSuccess: data => {
      console.log(data)
      closeSnackbar(data.transactionHash)
      setTxSuccess(data.transactionHash)
      callAlert(`Success! Tx hash: ${data.transactionHash}`, 'success');


    },
  });

  const checkSnackbar = async (tx1) => {
    await tx1.wait();
    closeSnackbar(tx1.hash);


  }
  useEffect(() => {
    if (tx && tx.hash) {
      checkSnackbar(tx);

      // setTxs(prevState => ({
      //     ...prevState,
      //     [tx.hash]: tx,
      //   })
      // )
    }

  }, [tx])


  return (
    <TransactionContext.Provider
      value={{ tx, setTx, txError, isLoading, txSuccess }}>
      {children}
    </TransactionContext.Provider>

  )

}