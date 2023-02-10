import { create } from "zustand";
import useWaitWagmi from "../hooks/useWaitWagmi";

const useDogStore = create((set) => ({


  transactions: {},
  addTransaction: (tx) => set(state => {

    return {
      transactions: {
        ...state.transactions,
        tx


      }
    }

  }),

  remove: (key) => set(state => {
    delete state.transactions[key];

  }),

  wait: async(tx) =>await useWaitWagmi(tx)


}))


export default useDogStore();