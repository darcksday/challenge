import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Stack,
  Button,
  Typography,
} from '@mui/material';
// components
import Page from '/src/components/Page';
// mock
import { useAccount, useContractRead } from 'wagmi';
import Abi from '/src/contractsData/CustomChallenge.json'
import ContractAddress from '/src/contractsData/CustomChallenge-address.json'
import { CommonTable } from "../../components/bet/CommonTable";
import { Custom } from "../../models/custom";
import { CreateRounded } from "@mui/icons-material";
import { Web3Context } from "../../context/Web3Context";
import { useContext } from "react";


export const MyCustomList = () => {

  const { userInfo } = useContext(Web3Context);


  const { data: items = [], refetch: refetchCollectionItems } = useContractRead({
    address: ContractAddress?.address,
    abi: Abi.abi,
    enabled: userInfo.address.length,
    select: (data) => data.filter((item) => parseInt(item.paid_maker)).map((item) => new Custom(item)),
    args: [userInfo.address],
    cacheTime: 4000,
    functionName: "getUserChallenges",
    watch: true,
    onSuccess: (data) => {
      console.log('data', data)
    }

  });


  return (
    <Page className="max-w-[1350px] mx-auto" title="Price Prediction">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Bets
        </Typography>
        <Button variant="contained" component={RouterLink} to="/custom/create" startIcon={<CreateRounded/>}>
          Create Bet
        </Button>
      </Stack>
      <CommonTable type={'custom'} items={items} table_head={Custom.TABLE_HEADERS}/>


    </Page>
  );
}