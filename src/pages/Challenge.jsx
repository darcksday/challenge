import { useContext, useEffect, useState } from 'react';
import Page from '../components/Page';
import {
  Avatar,
  Box,
  Card, CardActionArea, CardActions, CardContent, CardMedia, Chip,
  Grid,
  List,
  ListItemButton, ListItemSecondaryAction,
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
import { Link as RouterLink, useParams } from 'react-router-dom';
import TabContext from '@mui/lab/TabContext';
import { TabList } from '@mui/lab';

import TabPanel from '@mui/lab/TabPanel';
import { useAccount, useContractRead } from 'wagmi';

import ContractAddress from '../contractsData/Challenge-address.json';
import Abi from '../contractsData/Challenge.json';
import { canAccept, transformChallenges, canDelete, canJudge, isOracle, isTaker, isMaker } from '../utilits/transform';
import { dateFormat, isEmptyAddress } from '../utilits';
import { RequestContext } from '../context/RequestContext';
import { Communication } from '../components/Communication';
// import { Communication } from '../components/Communication';

export const Challenge = () => {
  const [value, setValue] = useState('1');
  let { id } = useParams();
  const { setConfig, txSuccess } = useContext(RequestContext);

  const { address } = useAccount()

  const { data: item, refetch: refetchCollectionItems } = useContractRead({
    addressOrName: ContractAddress?.address,
    contractInterface: Abi.abi,
    // enabled: isContractAddress(currentCommunity?.nftContract),
    select: (data) => transformChallenges(data),
    cacheTime: 5_000,
    args: [id],
    functionName: "getById",
    watch: true,

  });


  const remove = () => {
    setConfig(
      {
        'functionName': 'remove',
        'args': [id],
      }
    )

  }


  const accept = () => {
    setConfig(
      {
        'functionName': 'accept',
        'args': [id],
        'ether': item['accept_payment']

      }
    )

  }

  const setDraw = () => {
    setConfig(
      {
        'functionName': 'setDraw',
        'args': [id],

      }
    )
  }

  const setWinner = (address) => {

    setConfig(
      {
        'functionName': 'setWinner',
        'args': [id, address],

      }
    )


  }


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (item) {


    }
  }, [item])


  return (
    <Page className="max-w-[1350px] pt-0 mx-auto" title="Challenges">
      <div>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Challenges
          </Typography>
        </Stack>

        {(item) && (<Card>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                {(isOracle(item, address)) && (
                  <TabList onChange={handleChange} aria-label="lab API tabs example">

                    <Tab label="Main Detail" value="1" />
                    {(!isEmptyAddress(item.taker)) && (
                      <Tab label="Communication with Opponent" value={item.taker} />)
                    }
                    <Tab label="Communication with Initiator" value={item.maker} />
                  </TabList>
                )}


                {(isMaker(item, address)) && (
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Main Detail" value="1" />
                    <Tab label="Communication with Oracle" value={item.oracle} />
                    {(!isEmptyAddress(item.taker)) && (
                      <Tab label="Communication with Opponent" value={item.taker} />
                    )}
                  </TabList>

                )}

                {(isTaker(item, address)) && (
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Main Detail" value="1" />
                    <Tab label="Communication with Oracle" value={item.oracle} />
                    <Tab label="Communication with Initiator" value={item.maker} />
                  </TabList>

                )}

              </Box>
              <TabPanel value="1">
                <div className="flex w-full">
                  <div className="flex-row w-1/2 mr-4">
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="h5">Challenge Details</Typography>
                      </Grid>
                      <Grid item />
                    </Grid>
                    <Card sx={{ mt: 2 }}>
                      <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
                        <ListItemButton divider>
                          <Avatar className="mr-3" sx={{
                            color: 'primary.main',
                            bgcolor: 'primary.lighter'
                          }}>
                            <ShortTextIcon />
                          </Avatar>
                          <ListItemText primary="Name" />
                          <Typography variant="subtitle1">{item.name}</Typography>
                        </ListItemButton>


                        <ListItemButton divider>
                          <Avatar className="mr-3" sx={{
                            color: 'primary.main',
                            bgcolor: 'primary.lighter'
                          }}>
                            <PersonIcon />
                          </Avatar>
                          <ListItemText primary="Initiator Address" />
                          <Typography variant="subtitle2">{item.maker}</Typography>
                        </ListItemButton>
                        <ListItemButton divider>
                          <Avatar className="mr-3" sx={{
                            color: 'error.main',
                            bgcolor: 'error.lighter'
                          }}>
                            <GroupIcon />
                          </Avatar>
                          <ListItemText primary="Opponent Address" />
                          <Typography variant="subtitle2">{(isEmptyAddress(item.taker)) ? 'not defined' : item.taker}</Typography>
                        </ListItemButton>


                        <ListItemButton divider>
                          <Avatar className="mr-3" sx={{
                            color: 'success.main',
                            bgcolor: 'success.lighter'
                          }}>
                            <AdminPanelSettingsIcon />
                          </Avatar>
                          <ListItemText primary="Oracle Address" />
                          <Typography variant="subtitle2">{(isEmptyAddress(item.oracle)) ? 'not defined' : item.oracle}</Typography>
                        </ListItemButton>


                        <ListItemButton divider>
                          <Avatar className="mr-3" sx={{
                            color: 'success.main',
                            bgcolor: 'success.lighter'
                          }}>
                            <CalendarMonthIcon />
                          </Avatar>
                          <ListItemText primary="Created Date" />
                          <Typography variant="subtitle1">{dateFormat(item.created_date)}</Typography>
                        </ListItemButton>

                        <ListItemButton>
                          <Avatar className="mr-3" sx={{
                            color: 'error.main',
                            bgcolor: 'error.lighter'
                          }}>
                            <EventBusyIcon />
                          </Avatar>
                          <ListItemText primary="Deadline" />
                          <Typography variant="subtitle1">{dateFormat(item.deadline_date)}</Typography>
                        </ListItemButton>

                      </List>
                    </Card>
                  </div>
                  <div className="flex-row w-1/2">
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Typography variant="h5">Bet Details</Typography>
                    </Grid>
                    <Card sx={{ mt: 2 }}>
                      <ListItemButton divider>
                        <Avatar className="mr-3" sx={{
                          color: 'success.main',
                          bgcolor: 'success.lighter'
                        }}>
                          <PriceCheckIcon />
                        </Avatar>
                        <ListItemText primary="Bet" />
                        <Typography variant="subtitle1">{item.s_paid_maker}Ξ</Typography>
                      </ListItemButton>

                      <ListItemButton divider>
                        <Avatar className="mr-3" sx={{
                          color: 'primary.main',
                          bgcolor: 'primary.lighter'
                        }}>
                          <CurrencyExchangeIcon />
                        </Avatar>
                        <ListItemText primary="Coefficient" />
                        <Typography variant="subtitle1">{item.s_cof}</Typography>
                      </ListItemButton>
                      <ListItemButton divider>
                        <Avatar className="mr-3" sx={{
                          color: 'primary.main',
                          bgcolor: 'primary.lighter'
                        }}>
                          <PercentIcon />
                        </Avatar>
                        <ListItemText primary="Oracle fee" />
                        <Typography variant="subtitle1">{item.oracle_fee}%</Typography>
                      </ListItemButton>

                      <ListItemButton divider>
                        <Avatar className="mr-3" sx={{
                          color: 'primary.main',
                          bgcolor: 'primary.lighter'
                        }}>
                          <ShortTextIcon />
                        </Avatar>
                        <ListItemText primary="Status" />
                        {(item.status === 'waiting') && (
                          <Chip variant="outlined" className="font-semibold capitalize" label={item.status} size="small" color="primary" />)}
                        {(item.status === 'finished') && (<Chip className="font-semibold capitalize" label={item.status} size="small" color="success" />)}
                        {(item.status === 'taken') && (<Chip className="font-semibold capitalize" label={item.status} size="small" color="primary" />)}
                        {(item.status === 'in review') && (
                          <Chip variant="outlined" className="font-semibold capitalize" label={item.status} size="small" color="success" />)}
                      </ListItemButton>


                      <ListItemButton divider>
                        <Avatar className="mr-3" sx={{
                          color: 'success.main',
                          bgcolor: 'success.lighter'
                        }}>
                          <EmojiEventsIcon />
                        </Avatar>
                        <ListItemText primary={<Typography variant="subtitle1">Wining Amount</Typography>} secondary="Including your bet" />
                        <Typography variant="subtitle1">{item.wining_amount}Ξ</Typography>
                      </ListItemButton>

                      {(item.finished) && (
                        <ListItemButton divider>
                          <Avatar className="mr-3" sx={{
                            color: 'success.main',
                            bgcolor: 'success.lighter'
                          }}>
                            <EmojiEventsIcon />
                          </Avatar>
                          <ListItemText primary={<Typography variant="subtitle1">Winner</Typography>} />
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
                {canJudge(item, address) && (

                  <div className="flex w-full gap-4 justify-center mt-8">
                    <Button size="lg" onClick={() => setWinner(item.maker)} className=" bg-gradient-to-b from-[#FF512F] via-[#FF512F] to-[#F09819]">Initiator
                      Won</Button>
                    <IconButton onClick={setDraw} className="mx-5" size="lg">
                      <BalanceIcon />
                    </IconButton>
                    <Button size="lg" onClick={() => setWinner(item.taker)} className="bg-gradient-to-b from-[#5e55d6] via-[#8554da] to-[#ab52de]">Opponent
                      Won</Button>
                  </div>
                )
                }
                {canDelete(item, address) && (
                  <div className="flex w-full gap-4 justify-center mt-8">
                    <Button onClick={remove} size="lg" color="red">Remove</Button>

                  </div>
                )}

                {canAccept(item, address) && (
                  <div className="flex w-full gap-4 justify-center mt-8">
                    <Button onClick={accept} size="lg" color="green">Accept the challenge {item.accept_payment}Ξ</Button>
                  </div>
                )}


              </TabPanel>


              <TabPanel value={value}>
                <Communication convAddress={value} />
              </TabPanel>

            </TabContext>
          </Box>

        </Card>)}

      </div>
    </Page>


  );
}
