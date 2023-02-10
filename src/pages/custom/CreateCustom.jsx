import { useContext } from 'react';
import Page from '../../components/Page';
import { ethers } from 'ethers';
import { CustomForm } from "../../components/bet/CustomForm";
import Abi from '/src/contractsData/CustomChallenge.json'
import ContractAddress from '/src/contractsData/CustomChallenge-address.json'
import useWriteWagmi from "../../hooks/useWriteWagmi";

export const CreateCustom = () => {
  const { setConfig, txSuccess } = useWriteWagmi();



  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());
    if (data.deadline_date) {
      data['deadline_date'] = Date.parse(data['deadline_date']) / 1000
    }

    setConfig(
      {
        'address':ContractAddress?.address,
        'abi':Abi.abi,
        'functionName': 'create',
        'args': [data['name'], data['description'], ethers.utils.parseEther(data['cof']), data['oracle_fee'], data['deadline_date'], data['oracle']],
        'ether': data['paid_maker']
      }
    );

  }




  return (
    <Page
      className="mx-auto  bg-white  w-1/3	"
    >
      <div className="container z-20 mx-auto px-4">
        <section className="py-5 lg:py-10">
          <CustomForm handleSubmit={handleSubmit}/>
        </section>
      </div>
    </Page>


  );
}
