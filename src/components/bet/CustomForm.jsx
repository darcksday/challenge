import { useContext, useEffect, useState } from 'react';
import { Button, CardBody, CardFooter, Input, Textarea, Typography } from "@material-tailwind/react";
import { Avatar, CircularProgress, Slider } from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { useNetwork } from "wagmi";
import { minDate } from "../../utilits";
import { GelatoTxContext } from "../../context/GelatoTxContext";


export const CustomForm = ({ handleSubmit }) => {
  const [betData, setBetData] = useState({ paid_maker: 0, cof: 1, op_bet: '' });
  const chain = useNetwork();
  const nativeCurrency = chain.chain.nativeCurrency;
  const { isLoading } = useContext(GelatoTxContext);


  const handleChangeBetData = (e) => {
    setBetData((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value }
      }
    );
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
        Create Custom Prediction Bet
      </Typography>
      <CardBody className="flex flex-col gap-4">
        <Input name="name" label="Name" size="lg"/>
        <div className="">
          <Textarea name="description" required label="Describe details" size="lg"/>
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

        <div>
          <Input
            onChange={(e) => {
              handleChangeBetData(e)
            }}
            name="paid_maker" step="0.1" min="0.1" type="number" label={`Opponent Bet Amount In ${nativeCurrency.symbol}`}/>
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
        <label className="justify-center flex font-semibold	">Oracle reward in % </label>

        <Slider
          onChange={(e) => {
            handleChangeBetData(e)
          }}
          name="oracle_fee"
          aria-label="Temperature"
          defaultValue={0}
          valueLabelDisplay="on"
          step={1}
          min={0}
          max={100}
        />

        <div>
          <Input readOnly className="bg-gray-100 cursor-pointer" value={betData?.op_bet} type="number"
                 label={`Opponent Bet Amount In ${nativeCurrency.symbol}`}/>
        </div>

        <div>
          <Input required name="oracle" label="Oracle EVM address (0x28fa••••f7b9)"/>
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


  );


}