import { useContext, useEffect, useState } from 'react';
import Page from '../../components/Page';
import { RequestContext } from '../../context/RequestContext';
import { PriceForm } from "../../components/bet/PriceForm";
import Abi from '/src/contractsData/PriceChallenge.json'
import ContractAddress from '/src/contractsData/PriceChallenge-address.json'
import { ethers } from "ethers";
import { parseUnits } from "@ethersproject/units/src.ts";
import { useNavigate } from "react-router-dom";

export const CreatePrice = () => {
  const { setConfig, txSuccess } = useContext(RequestContext);
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
        'addressOrName': ContractAddress?.address,
        'contractInterface': Abi.abi,
        'functionName': 'create',
        'args': [data['name'], ethers.utils.parseEther(data['cof']), data['deadline_date'], data['token_address'], parseUnits(data['price_prediction'], 8), data['prediction_type']],
        'ether': data['paid_maker']
      }
    );

  }


  useEffect(() => {

    navigate('/custom')


  }, [txSuccess]);


  return (
    <Page
      className="mx-auto  bg-white  w-1/3	"
    >
      <div className="container z-20 mx-auto px-4">
        <section className="py-5 lg:py-10">
          <PriceForm handleSubmit={handleSubmit}/>
        </section>
      </div>
    </Page>


  );
}
