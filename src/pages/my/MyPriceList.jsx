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
import Abi from '/src/contractsData/PriceChallenge.json'
import ContractAddress from '/src/contractsData/PriceChallenge-address.json'
import { CommonTable } from "../../components/bet/CommonTable";
import { Price } from "../../models/price";
import { CreateRounded } from "@mui/icons-material";






export const MyPriceList = () => {

  const { address } = useAccount()


  const { data: items = [], refetch: refetchCollectionItems } = useContractRead({
    address: ContractAddress?.address,
    abi: Abi.abi,
    enabled: address?.length ,
    select: (data) => data.map((item) => new Price(item)),
    args: [address],
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
        <Button variant="contained" component={RouterLink} to="/price/create" startIcon={<CreateRounded/>}>
          Create Bet
        </Button>
      </Stack>
      <CommonTable type={'price'} items={items} table_head={Price.TABLE_HEADERS}/>


    </Page>
  );
}