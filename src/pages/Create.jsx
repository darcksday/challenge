import { Textarea, Card, Input, CardFooter, Button, CardBody, Typography, CardHeader, Checkbox } from '@material-tailwind/react';
import { useContext, useEffect, useState } from 'react';
import { Slider, Avatar } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Page from '../components/Page';
import { RequestContext } from '../context/RequestContext';
import { ethers } from 'ethers';

export const Create = () => {
  const [betData, setBetData] = useState({ paid_maker: 0, cof: 1, op_bet: '' });
  const { setConfig, txSuccess } = useContext(RequestContext);


  const minDate = () => {
    let tomorrow = new Date(Date.now() + (60 * 60 * 1000));
    let isoString = tomorrow.toISOString();
    return isoString.substring(0, isoString.indexOf("T") + 6);

  }
  const defaultDate = () => {
    let tomorrow = new Date(Date.now() + 3 * (60 * 60 * 1000))
    let isoString = tomorrow.toISOString();
    return isoString.substring(0, isoString.indexOf("T") + 6);

  }


  const handleChangeBetData = (e) => {
    setBetData((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value }
      }
    );
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());
    if (data.deadline_date) {
      data['deadline_date'] = Date.parse(data['deadline_date']) / 1000
    }
    setConfig(
      {
        'functionName': 'create',
        'args': [data['name'], data['description'], ethers.utils.parseEther(data['cof']), data['oracle_fee'], data['deadline_date'], data['oracle']],
        'ether': data['paid_maker']
      }
    )

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


  useEffect(() => {


  }, [txSuccess])

  return (
    <Page
      className="mx-auto  bg-white  w-1/3	"
    >
      <div className="container z-20 mx-auto px-4">
        <section className="py-10 lg:py-20">
          <form onSubmit={(e) => handleSubmit(e)}>
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-16 place-items-center"
            >
              <Typography variant="h4" color="white">
                Create Challenge or Bet
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Input name="name" label="Name" size="lg" />
              <div className="">
                <Textarea name="description" required label="Describe details" size="lg" />
              </div>


              <div>
                <Input
                  name="deadline_date"
                  value={defaultDate()}
                  required className="h-[44px]"
                  id="datetime-local"
                  label="Deadline"
                  type="datetime-local"
                  min={minDate()}
                  defaultValue={defaultDate()}
                />
              </div>

              <div>
                <Input
                  onChange={(e) => {
                    handleChangeBetData(e)
                  }}
                  name="paid_maker" step="0.1" min="0.1" type="number" label="Bet Amount Ξ" />
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
                <Input readOnly value={betData?.op_bet} type="number" label="Opponent Bet Amount Ξ will be" />
              </div>

              <div>
                <Input required name="oracle" label="Oracle EVM address (0x28fa••••f7b9)" />
              </div>


            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" variant="gradient" fullWidth>
                Create
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                Don't have an account?
                <Typography
                  as="a"
                  href="#signup"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Typography>
            </CardFooter>
          </form>
        </section>
      </div>
    </Page>


  );
}
