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
import { useContractRead } from 'wagmi';
import Abi from '/src/contractsData/CustomChallenge.json'
import ContractAddress from '/src/contractsData/CustomChallenge-address.json'
import { CommonTable } from "../../components/bet/CommonTable";
import { Custom } from "../../models/custom";






export const CustomList = () => {


  const table_head = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'bid', label: 'Bid Amount', alignRight: false },
    { id: 'cof', label: 'Coefficient', alignRight: false },
    { id: 'win_amount', label: 'Win Amount', alignRight: false },
    { id: 'maker', label: 'Initiator', alignRight: false },
    { id: 'taker', label: 'Opponent', alignRight: false },

    // { id: 'created_date', label: 'Created at', alignRight: false },
    { id: 'deadline_date', label: 'Deadline', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'button', alignRight: false },

  ];

  const { data: items = [], refetch: refetchCollectionItems } = useContractRead({
    addressOrName: ContractAddress?.address,
    contractInterface: Abi.abi,
    // enabled: isContractAddress(currentCommunity?.nftContract),
    select: (data) => data.filter((item) => parseInt(item.paid_maker)).map((item) => new Custom(item)),

    cacheTime: 4000,
    functionName: "allChallenges",
    watch: true,
    onSuccess: (data) => {
      console.log('data', data)
    }

  });











  return (
    <Page className="max-w-[1350px] mx-auto" title="Price Prediction">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Challenges
        </Typography>
        <Button variant="contained" component={RouterLink} to="/create" startIcon={''}>
          New Challenges
        </Button>
      </Stack>
      <CommonTable type={'custom'} items={items} table_head={table_head}/>


    </Page>
  );
}