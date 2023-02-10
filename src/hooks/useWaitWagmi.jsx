import { useState, useEffect } from "react";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { ethers } from "ethers";
import { useSnackbar } from "notistack";
import useAlert from "./useAlert";
import { create } from 'zustand'

const useWaiteWagmi = (tx) => {
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
      closeSnackbar(hash)
      callAlert(`Success! Tx hash: ${data.transactionHash}`, 'success');


    },
  });

  useEffect(() => {
    console.log(tx);
  }, [tx])

  return { txSuccess, txError, hash, isLoading }

};

export default useWaiteWagmi;