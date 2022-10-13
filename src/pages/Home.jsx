import { Card } from '@material-tailwind/react';
import { useContractRead, useSignMessage } from 'wagmi';
import { Button, Input } from '@mui/material';
import { useContext, useState } from 'react';
import ContractAddress from '../contractsData/Verification-address.json';
import Abi from '../contractsData/Verification.json';
import { filterEmpty, transformChallenges } from '../utilits/transform';
import { ethers } from 'ethers';

export const Home = () => {
  const [message, setMessage] = useState();
  const [signature, setSignature] = useState('');
  const [enable, setEnable] = useState(false);
  const [variables, setVariables] = useState();
  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      setSignature(data);

      setVariables(ethers.utils.hashMessage(variables.message));
    },
  })
  const { data: result } = useContractRead({
    addressOrName: ContractAddress?.address,
    contractInterface: Abi.abi,

    enabled: enable,
    args: [variables, signature],

    onSuccess: (res) => {
      console.log(res)
    },

    onError: (err) => {
      console.log(err);
    },
    cacheTime: 2_000,
    functionName: "recover",
    watch: true,

  });

  const check = (e) => {
    setEnable(true)
    const address = ethers.utils.verifyMessage(message, signature)
  }

  return (<>
      <div className="h-screen min-h-screen  bg-cover bg-center bg-no-repeat">
        <div className="relative z-50 h-fit py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <Card
              shadow={false}
              className="mx-6  mt-20 bg-white "
            >
              <Input label="Message" onChange={(e) => setMessage(e.target.value)} />
              <Button onClick={() => {
                signMessage({ message })
              }}>Sign</Button>

              {signature && (
                <Button onClick={() => check(true)}>Check</Button>


              )}

            </Card>
          </div>
        </div>


      </div>

    </>
  );
}
