import { useContext, useEffect, useState } from 'react';
import Page from '../../components/Page';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Tab,
  Typography
} from '@mui/material';

import { Button, IconButton } from '@material-tailwind/react';

import ShortTextIcon from '@mui/icons-material/ShortText';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PercentIcon from '@mui/icons-material/Percent';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BalanceIcon from '@mui/icons-material/Balance';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import TabContext from '@mui/lab/TabContext';
import { TabList } from '@mui/lab';

import TabPanel from '@mui/lab/TabPanel';
import { useAccount, useContractRead } from 'wagmi';

import ContractAddress from '../../contractsData/CustomChallenge-address.json';
import Abi from '../../contractsData/CustomChallenge.json';
import { dateFormat, isEmptyAddress } from '../../utilits';
import { Communication } from '../../components/Communication';
import { Custom } from "../../models/custom";
import { Status } from "../../components/bet/Status";
import { GelatoTxContext } from "../../context/GelatoTxContext";
import { Web3Context } from "../../context/Web3Context";

export const ViewCustom = () => {
  const [tab, setTab] = useState('0');
  const [value, setValue] = useState(false);
  let { id } = useParams();
  const navigate = useNavigate
  const { setConfig, txSuccess, clearConfig } = useContext(GelatoTxContext);
  const { chains, userInfo } = useContext(Web3Context);

  const address = userInfo.address;

  const chain = chains[0];
  const nativeCurrency = chain.nativeCurrency;

  const { data: item, refetch: refetchCollectionItems } = useContractRead({
    address: ContractAddress?.address, abi: Abi.abi, // enabled: isContractAddress(currentCommunity?.nftContract),
    select: (data) => new Custom(data), cacheTime: 5_000, args: [id], functionName: "getById", watch: true,

  });


  const remove = () => {
    setConfig({
      'address': ContractAddress?.address, 'abi': Abi.abi, 'functionName': 'remove', 'args': [id],
    })

  }


  const accept = () => {
    setConfig({
      'address': ContractAddress?.address, 'abi': Abi.abi, 'functionName': 'accept', 'args': [id], 'ether': item['accept_payment']

    })

  }

  const setDraw = () => {
    setConfig({
      'address': ContractAddress?.address, 'abi': Abi.abi, 'functionName': 'setDraw', 'args': [id],

    })
  }

  const setWinner = (address) => {

    setConfig({
      'address': ContractAddress?.address, 'abi': Abi.abi, 'functionName': 'setWinner', 'args': [id, address],

    })


  }


  const handleChange = (event, newValue) => {
    setTab(newValue);
    if (newValue !== '0') {
      setValue(newValue);
    }


  };
  useEffect(() => {
    if (txSuccess) {
      clearConfig();
      navigate('/custom');

    }

  }, [txSuccess])

  return (<Page className="max-w-[1350px] pt-0 mx-auto" title="Challenges">
      <div>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Challenges
          </Typography>
        </Stack>

        {(item) && (<Card>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                {item.isOracle(address) && (<TabList onChange={handleChange} aria-label="lab API tabs example">

                  <Tab label="Main Detail" value="0"/>
                  {(!isEmptyAddress(item.taker)) && (<Tab label="Communication with Opponent" value={item.taker}/>)}
                  <Tab label="Communication with Initiator" value={item.maker}/>
                </TabList>)}


                {item.isMaker(address) && (<TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Main Detail" value="0"/>
                    {(!isEmptyAddress(item.taker)) && (<Tab label="Communication with Opponent" value={item.taker}/>)}
                  </TabList>

                )}

                {item.isTaker(address) && (<TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Main Detail" value="0"/>
                    <Tab label="Communication with Initiator" value={item.maker}/>
                  </TabList>

                )}

              </Box>
              <TabPanel value="0">
                <div className="flex w-full">
                  <div className="flex-row w-1/2 mr-4">
                    <Card sx={{ mt: 2 }}>
                      <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
                        <ListItemButton divider>
                          <Avatar className="mr-3" sx={{
                            color: 'primary.main', bgcolor: 'primary.lighter'
                          }}>
                            <ShortTextIcon/>
                          </Avatar>
                          <ListItemText primary="Name"/>
                          <Typography variant="subtitle1">{item.name}</Typography>
                        </ListItemButton>


                        <ListItemButton divider>
                          <Avatar className="mr-3" sx={{
                            color: 'primary.main', bgcolor: 'primary.lighter'
                          }}>
                            <PersonIcon/>
                          </Avatar>
                          <ListItemText primary="Initiator Address"/>
                          <Typography variant="subtitle2">{item.maker}</Typography>
                        </ListItemButton>
                        <ListItemButton divider>
                          <Avatar className="mr-3" sx={{
                            color: 'error.main', bgcolor: 'error.lighter'
                          }}>
                            <GroupIcon/>
                          </Avatar>
                          <ListItemText primary="Opponent Address"/>
                          <Typography variant="subtitle2">{(isEmptyAddress(item.taker)) ? 'not defined' : item.taker}</Typography>
                        </ListItemButton>


                        <ListItemButton divider>
                          <Avatar className="mr-3" sx={{
                            color: 'success.main', bgcolor: 'success.lighter'
                          }}>
                            <AdminPanelSettingsIcon/>
                          </Avatar>
                          <ListItemText primary="Oracle Address"/>
                          <Typography variant="subtitle2">{(isEmptyAddress(item.oracle)) ? 'not defined' : item.oracle}</Typography>
                        </ListItemButton>


                        <ListItemButton divider>
                          <Avatar className="mr-3" sx={{
                            color: 'success.main', bgcolor: 'success.lighter'
                          }}>
                            <CalendarMonthIcon/>
                          </Avatar>
                          <ListItemText primary="Created Date"/>
                          <Typography variant="subtitle1">{dateFormat(item.created_date)}</Typography>
                        </ListItemButton>

                        <ListItemButton>
                          <Avatar className="mr-3" sx={{
                            color: 'error.main', bgcolor: 'error.lighter'
                          }}>
                            <EventBusyIcon/>
                          </Avatar>
                          <ListItemText primary="Deadline"/>
                          <Typography variant="subtitle1">{dateFormat(item.deadline_date)}</Typography>
                        </ListItemButton>

                      </List>
                    </Card>
                  </div>
                  <div className="flex-row w-1/2">
                    <Card sx={{ mt: 2 }}>
                      <ListItemButton divider>
                        <Avatar className="mr-3" sx={{
                          color: 'success.main', bgcolor: 'success.lighter'
                        }}>
                          <PriceCheckIcon/>
                        </Avatar>
                        <ListItemText primary="Bet Amount"/>
                        <Typography variant="subtitle1">{item.s_paid_maker + '' + nativeCurrency.symbol}</Typography>
                      </ListItemButton>

                      <ListItemButton divider>
                        <Avatar className="mr-3" sx={{
                          color: 'primary.main', bgcolor: 'primary.lighter'
                        }}>
                          <CurrencyExchangeIcon/>
                        </Avatar>
                        <ListItemText primary="Coefficient"/>
                        <Typography variant="subtitle1">{item.s_cof}</Typography>
                      </ListItemButton>
                      <ListItemButton divider>
                        <Avatar className="mr-3" sx={{
                          color: 'primary.main', bgcolor: 'primary.lighter'
                        }}>
                          <PercentIcon/>
                        </Avatar>
                        <ListItemText primary="Oracle fee"/>
                        <Typography variant="subtitle1">{item.oracle_fee}%</Typography>
                      </ListItemButton>

                      <ListItemButton divider>
                        <Avatar className="mr-3" sx={{
                          color: 'primary.main', bgcolor: 'primary.lighter'
                        }}>
                          <ShortTextIcon/>
                        </Avatar>
                        <ListItemText primary="Status"/>
                        <Status item={item}/>

                      </ListItemButton>


                      <ListItemButton divider>
                        <Avatar className="mr-3" sx={{
                          color: 'success.main', bgcolor: 'success.lighter'
                        }}>
                          <EmojiEventsIcon/>
                        </Avatar>
                        <ListItemText primary={<Typography variant="subtitle1">Wining Amount</Typography>} secondary="Including your bet"/>
                        <Typography variant="subtitle1">{item.winingAmount + '' + nativeCurrency.symbol}</Typography>
                      </ListItemButton>

                      {(item.finished) && (<ListItemButton divider>
                          <Avatar className="mr-3" sx={{
                            color: 'success.main', bgcolor: 'success.lighter'
                          }}>
                            <EmojiEventsIcon/>
                          </Avatar>
                          <ListItemText primary={<Typography variant="subtitle1">Winner</Typography>}/>
                          <Typography variant="subtitle2">{(!isEmptyAddress(item.winner)) ? item.winner : 'draw'}</Typography>
                        </ListItemButton>


                      )}


                      <Card>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            Description
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.description}
                          </Typography>
                        </CardContent>
                      </Card>


                    </Card>
                  </div>
                </div>
                {item.canJudge(address) && (

                  <div className="flex w-full gap-4 justify-center mt-8">
                    <Button size="lg" onClick={() => setWinner(item.maker)}
                            className=" bg-gradient-to-b from-[#FF512F] via-[#FF512F] to-[#F09819]">Initiator
                      Won</Button>
                    <IconButton onClick={setDraw} className="mx-5" size="lg">
                      <BalanceIcon/>
                    </IconButton>
                    <Button size="lg" onClick={() => setWinner(item.taker)}
                            className="bg-gradient-to-b from-[#5e55d6] via-[#8554da] to-[#ab52de]">Opponent
                      Won</Button>
                  </div>)}
                {item.canDelete(address) && (<div className="flex w-full gap-4 justify-center mt-8">
                  <Button onClick={remove} size="lg" color="red">Remove</Button>

                </div>)}

                {item.canAccept(address) && (<div className="flex w-full gap-4 justify-center mt-8">
                  <Button onClick={accept} size="lg" color="blue">Bet {item.accept_payment + nativeCurrency.symbol}</Button>
                </div>)}


              </TabPanel>


            </TabContext>
            <div className={tab === '0' ? 'hidden' : ''}>
              <Communication convAddress={value}/>
            </div>
          </Box>

        </Card>)}

      </div>
    </Page>


  );
}
