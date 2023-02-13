import { create } from "zustand";
import useWaitWagmi from "../hooks/useWaitWagmi";
import useAlert from "../hooks/useAlert";
import { useState } from "react";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { ethers } from "ethers";
import { useSnackbar } from "notistack";

const useTransactions = create((set) => ({


  transactions: {},


  waitTx:  async (tx) => {
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

  }





  // wait: async (tx) => await useWaitWagmi(tx)


}))


export default useDogStore();