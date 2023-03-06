import { useContext, useEffect, useState } from 'react';
import Page from '../../components/Page';
import { PriceForm } from "../../components/bet/PriceForm";
import Abi from '/src/contractsData/PriceChallenge.json'
import ContractAddress from '/src/contractsData/PriceChallenge-address.json'
import { ethers } from "ethers";
import { parseUnits } from "@ethersproject/units/src.ts";
import { useNavigate } from "react-router-dom";
import useWriteWagmi from "../../hooks/useWriteWagmi";
import { TransactionContext } from "../../context/TransactionContext";
import sdk from "redstone-sdk";

export const CreatePrice = () => {
  const { setConfig, tx } = useWriteWagmi();
  const { txSuccess, isLoading } = useContext(TransactionContext);


  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());
    if (data.deadline_date) {
      data['deadline_date'] = Date.parse(data['deadline_date']) / 1000
    }

    const redstonePayload = await sdk.requestRedstonePayload(
      {
        dataServiceId: "redstone-main-demo",
        uniqueSignersCount: 1,
        dataFeeds: [data.token_symbol],
      },
      ["https://d33trozg86ya9x.cloudfront.net"],
      "manual-payload"
    );

    if (redstonePayload) {
      data['redstone_payload'] = redstonePayload;
    }
    console.log(data)
    // setConfig(
    //   {
    //     'address': ContractAddress?.address,
    //     'abi': Abi.abi,
    //     'functionName': 'create',
    //     'args': [
    //       data['name'],
    //       ethers.utils.parseEther(data['cof']),
    //       data['deadline_date'],
    //       parseUnits(data['price_prediction'], 8),
    //       data['prediction_type'],
    //       data['redstone_payload'],
    //       data['token_symbol']
    //     ],
    //     'ether': data['paid_maker']
    //   }
    // );

  }

  useEffect(() => {
    if (txSuccess && txSuccess === tx?.hash) {
      navigate('/price');

    }

  }, [txSuccess])


  return (
    <Page
      className="mx-auto  bg-white  w-[700px]	"
    >
      <div className="container z-20 mx-auto px-4">
        <section className="py-5 lg:py-10">
          <PriceForm tx={tx} handleSubmit={handleSubmit}/>
        </section>
      </div>
    </Page>


  );
}
