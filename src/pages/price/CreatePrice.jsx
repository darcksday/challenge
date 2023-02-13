import { useContext, useEffect, useState } from 'react';
import Page from '../../components/Page';
import { PriceForm } from "../../components/bet/PriceForm";
import Abi from '/src/contractsData/PriceChallenge.json'
import ContractAddress from '/src/contractsData/PriceChallenge-address.json'
import { ethers } from "ethers";
import { parseUnits } from "@ethersproject/units/src.ts";
import { useNavigate } from "react-router-dom";
import useWriteWagmi from "../../hooks/useWriteWagmi";
import useWaitWagmi from "../../hooks/useWaitWagmi";
import { TransactionContext } from "../../context/TransactionContext";

export const CreatePrice = () => {
  const { setConfig, tx } = useWriteWagmi();
  const { txSuccess, isLoading, txs } = useContext(TransactionContext);


  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());
    if (data.deadline_date) {
      data['deadline_date'] = Date.parse(data['deadline_date']) / 1000
    }
    setConfig(
      {
        'address': ContractAddress?.address,
        'abi': Abi.abi,
        'functionName': 'create',
        'args': [data['name'], ethers.utils.parseEther(data['cof']), data['deadline_date'], data['token_address'], parseUnits(data['price_prediction'], 8), data['prediction_type']],
        'ether': data['paid_maker']
      }
    );

  }

  useEffect(() => {
    if (txs[tx]) {
      console.log(txs[tx])
      console.log(txs)
      // navigate('/price');


    }

  }, [txs[tx]])


  return (
    <Page
      className="mx-auto  bg-white  w-1/3	"
    >
      <div className="container z-20 mx-auto px-4">
        <section className="py-5 lg:py-10">
          <PriceForm tx={tx} handleSubmit={handleSubmit}/>
        </section>
      </div>
    </Page>


  );
}
