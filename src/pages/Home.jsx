import { Card } from '@material-tailwind/react';
import { useContractRead, useSignMessage, useSignTypedData } from 'wagmi';
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
  const [variables, setVariables] = useState([]);
  const [variablesEip, setVariablesEip] = useState([]);
  const [final, setFinal] = useState([]);

  // All properties on a domain are optional
  const domain = {
    name: 'Ether Mail',
    version: '1',
    chainId: 31337,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  }

// The named list of all type definitions
  const types = {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    BLA: [
      { name: 'name1', type: 'int' },


    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
      { name: 'some', type: 'BLA' },
    ],


  }

  const value = {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
    some: {
      name1: 1


    }
  }


  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      setSignature(data);
      setVariables(ethers.utils.hashMessage(variables.message));
    },
  })

  //eip721
  const { data1, isError, isLoading1, isSuccess, signTypedData } =
    useSignTypedData({

        domain,
        types,
        value,
        onSuccess(data, variables) {
          console.log(data)

          const { domain, types, value } = variables;
          const structHash = ethers.utils._TypedDataEncoder.hash(domain, types, value)

          setSignature(data);
          setVariablesEip(structHash);

        }
      },
    )


  const { data: result } = useContractRead({
    addressOrName: ContractAddress?.address,
    contractInterface: Abi.abi,

    enabled: enable,
    args: [final, signature],

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

    setFinal(variables)

    setEnable(true)
    const address = ethers.utils.verifyMessage(message, signature);
  }

  const checkEip = (e) => {

    setFinal(variablesEip)

    setEnable(true)
    const address = ethers.utils.verifyTypedData(domain, types, value, signature);
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
                signMessage({ message: message })


              }}>Sign</Button>

              <Button onClick={() => {
                signTypedData()
              }}>Sign EIP712</Button>

              {(signature && variables) && (
                <Button onClick={() => check(true)}>Check</Button>


              )}

              {(signature && variablesEip) && (
                <Button onClick={() => checkEip(true)}>Check EIP</Button>


              )}

            </Card>
          </div>
        </div>


      </div>

    </>
  );
}
