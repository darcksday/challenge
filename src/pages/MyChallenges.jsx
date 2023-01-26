import { useContractRead } from 'wagmi';
import ContractAddress from '../contractsData/CustomChallenge-address.json';
import Abi from '../contractsData/Challenge.json';
import { filterEmpty, transformChallenges } from '../utilits/transform';
import TableChallenges from '../components/TableChallenges';

export const MyChallenges = () => {
  const { data: items = [], refetch: refetchCollectionItems } = useContractRead({
    addressOrName: ContractAddress?.address,
    contractInterface: Abi.abi,
    // enabled: isContractAddress(currentCommunity?.nftContract),
    select: (data) => data.filter((item) => filterEmpty(item)).map((item) => transformChallenges(item)),

    cacheTime: 2_000,
    functionName: "allChallenges",
    watch: true,

  });

  return (<TableChallenges items={items} />)

}
