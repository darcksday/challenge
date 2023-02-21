import { useContext, useEffect, useState } from 'react';
import { Button, CardBody, CardFooter, Input, Typography, Option } from "@material-tailwind/react";
import { Avatar, CircularProgress, FormControl, InputLabel, MenuItem, Select, Slider } from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";
import priceFeed from '../../utilits/priceFeed.json';
import { useContractRead, useNetwork } from 'wagmi'
import ContractAddress from "../../contractsData/PriceChallenge-address.json";
import Abi from "../../contractsData/PriceChallenge.json";
import { formatAmount, getLogo, minDate } from "../../utilits";
import { useNavigate } from "react-router-dom";
// import {  Select as Select1 } from "@mui/material";
import { Price } from "../../models/price";
import { TransactionContext } from "../../context/TransactionContext";


export const PriceForm = ({ handleSubmit }) => {
  const [betData, setBetData] = useState({ paid_maker: 0, cof: 1, op_bet: '' });
  const [contractFeed, setContractFeed] = useState([]);
  const chain = useNetwork();
  const networks = priceFeed[chain.chain.id];
  const nativeCurrency = chain.chain.nativeCurrency;

  const { isLoading } = useContext(TransactionContext);


  const { data: price = '', refetch: refetchCollectionItems } = useContractRead({
    address: ContractAddress?.address,
    abi: Abi.abi,
    select: (data) => parseFloat(formatAmount(data, 8)).toFixed(2),
    args: [contractFeed],
    functionName: "cronPriceFeed",
    // watch: true,
    onSuccess: (data) => {
      console.log('data', data)
    },
    onError: (error) => {
      console.log(contractFeed)
      console.log(error)
    },
    enabled: contractFeed.length > 0,

  });


  const handleChangeBetData = (e) => {
    setBetData((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value }
      }
    );
  }


  const changeCoin = (e) => {
    setContractFeed(e);
  }


  useEffect(() => {
    if (betData['paid_maker']) {
      setBetData((prevState) => {
        return { ...prevState, 'op_bet': betData['paid_maker'] * betData['cof'] }
      })
    } else {
      setBetData((prevState) => {
        return { ...prevState, 'op_bet': '' }
      })


    }
  }, [betData['paid_maker'], betData['cof']])


  return (

    <form onSubmit={(e) => handleSubmit(e)}>
      <Typography variant="h4" className="text-center text-[#2065d1]">
        Create Price Prediction Bet
      </Typography>
      <CardBody className="flex flex-col gap-4">
        <Input required name="name" label="Name" size="lg"/>


        <div>
          <Input
            onChange={(e) => {
              handleChangeBetData(e)
            }}
            name="paid_maker" required step="0.1" min="0.1" type="number" label={`Bet Amount In ${nativeCurrency.symbol}`}/>
        </div>
        <label className="justify-center flex font-semibold	">Challenge reward coefficient</label>

        <div className="flex justify-between items-center my-4 	">
          <Avatar className="bg-gradient-to-b from-[#FF512F] via-[#FF512F] to-[#F09819]"
                  sx={{ width: 65, height: 65, bgcolor: deepOrange[500], fontSize: "14px" }}>

            Opponent
          </Avatar>
          <div className="w-4/6	">

            <Slider
              onChange={(e) => {
                handleChangeBetData(e)
              }}
              name="cof"
              aria-label="Temperature"
              defaultValue={1}
              valueLabelDisplay="on"
              step={0.1}
              min={0.1}
              max={10}
            />

          </div>
          <Avatar className="bg-gradient-to-b from-[#5e55d6] via-[#8554da] to-[#ab52de]"
                  sx={{ width: 65, height: 65, bgcolor: deepPurple[500], fontSize: "14px" }}>
            YOU
          </Avatar>

        </div>


        <div>
          <Input readOnly className="bg-gray-100 cursor-pointer" value={betData?.op_bet} type="number"
                 label={`Opponent Bet Amount In ${nativeCurrency.symbol}`}/>
        </div>
        <div className="flex justify-between items-center my-4">

          <FormControl size="small" required className="w-1/3 mr-2" variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">Select Coin</InputLabel>
            <Select
              name="token_address"

              onChange={(e) => {
                changeCoin(e.target.value)
              }}
              label="Select Coin">

              {
                networks.map((item) => {
                  return (
                    <MenuItem value={item.feedContract} key={item.symbol}>
                      <div className="flex items-center">
                        <Avatar className="mr-2 h-[20px] w-[20px]" alt={item.name} src={Price.getLogo(item.logo_id)}/>
                        <span className="uppercase">{item.symbol}</span>
                      </div>
                    </MenuItem>)
                })
              }

            </Select>
          </FormControl>

          <FormControl size="small" required className="w-1/3 mr-2" variant="outlined">
            <InputLabel>more or less</InputLabel>
            <Select
              name="prediction_type"

              label="more or less"
            >
              <MenuItem value="0"> > more than </MenuItem>
              <MenuItem value="1"> less than </MenuItem>
            </Select>
          </FormControl>

          <div className="w-1/3">
            <Input required name="price_prediction" defaultValue={price} step="0.01" min="0.01" type="number" label="USD"/>
          </div>
        </div>
        <div>
          <Input
            name="deadline_date"
            required className="h-[44px]"
            id="datetime-local"
            label="Expiration date UTC"
            type="date"
            min={minDate()}
            defaultValue={minDate()}
          />
        </div>


      </CardBody>
      <CardFooter className="pt-0 flex justify-center ">

        {isLoading ? <CircularProgress/> :
          <Button type="submit" variant="gradient" fullWidth>
            Create
          </Button>

        }

      </CardFooter>
    </form>


  )
    ;


}