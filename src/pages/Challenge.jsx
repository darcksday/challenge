import { useEffect, useState } from 'react';
import Page from '../components/Page';
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton, ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';


import { Link as RouterLink, useParams } from 'react-router-dom';
import TabContext from '@mui/lab/TabContext';
import { TabList } from '@mui/lab';

import TabPanel from '@mui/lab/TabPanel';
import { useContractRead } from 'wagmi';
import ContractAddress from '../contractsData/Challenge-address.json';
import Abi from '../contractsData/Challenge.json';
import { transformChallenges } from '../utilits/transform';

export const Challenge = () => {
  const [value, setValue] = useState('1');
  let { id } = useParams();

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


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (id) {

    }
    console.log(item);
  }, [item])


  return (
    <Page class="max-w-[1350px] pt-0 mx-auto" title="Challenges">
      <div>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Challenges
          </Typography>
        </Stack>


        <Card>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Main Detail" value="1" />
                  <Tab label="Full Description" value="2" />
                  <Tab label="Communication" value="3" />
                </TabList>
              </Box>
              <TabPanel className="flex w-full" value="1">

                <div className="flex-col w-1/2 mr-4">
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                      <Typography variant="h5">Analytics Report</Typography>
                    </Grid>
                    <Grid item />
                  </Grid>
                  <Card sx={{ mt: 2 }} content={false}>
                    <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
                      <ListItemButton divider>
                        <Avatar className="mr-3" sx={{
                          color: 'primary.main',
                          bgcolor: 'primary.lighter'
                        }}>
                          <DriveFileRenameOutlineIcon />
                        </Avatar>
                        <ListItemText primary="Name" />
                        <Typography variant="h5">+45.14%</Typography>
                      </ListItemButton>


                      <ListItemButton divider>
                        <Avatar className="mr-3" sx={{
                          color: 'primary.main',
                          bgcolor: 'primary.lighter'
                        }}>
                          <DriveFileRenameOutlineIcon />
                        </Avatar>
                        <ListItemText primary="Initiator Address" />
                        <Typography variant="h5">Low</Typography>
                      </ListItemButton>
                      <ListItemButton divider>
                        <Avatar className="mr-3" sx={{
                          color: 'primary.main',
                          bgcolor: 'primary.lighter'
                        }}>
                          <DriveFileRenameOutlineIcon />
                        </Avatar>
                        <ListItemText primary="Opponent Address" />
                        <Typography variant="h5">Low</Typography>
                      </ListItemButton>


                      <ListItemButton divider>
                        <Avatar className="mr-3" sx={{
                          color: 'primary.main',
                          bgcolor: 'primary.lighter'
                        }}>
                          <DriveFileRenameOutlineIcon />
                        </Avatar>
                        <ListItemText primary="Created Date" />
                        <Typography variant="h5">Low</Typography>
                      </ListItemButton>

                      <ListItemButton>
                        <Avatar className="mr-3" sx={{
                          color: 'primary.main',
                          bgcolor: 'primary.lighter'
                        }}>
                          <DriveFileRenameOutlineIcon />
                        </Avatar>
                        <ListItemText primary="Deadline" />
                        <Typography variant="h5">Low</Typography>
                      </ListItemButton>

                    </List>
                  </Card>
                </div>
                <div className="flex-col w-1/2">
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                      <Typography variant="h5">Transaction History</Typography>
                    </Grid>
                    <Grid item />
                  </Grid>
                  <Card sx={{ mt: 2 }} content={false}>
                    <ListItemButton divider>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            color: 'success.main',
                            bgcolor: 'success.lighter'
                          }}
                        >
                          <CardGiftcardIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={<Typography variant="subtitle1">Bet</Typography>} secondary="Today, 2:00 AM" />
                      <ListItemSecondaryAction>
                        <Stack alignItems="flex-end">
                          <Typography variant="subtitle1" noWrap>
                            + $1,430
                          </Typography>
                          <Typography variant="h6" color="secondary" noWrap>
                            78%
                          </Typography>
                        </Stack>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                    <ListItemButton divider>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            color: 'primary.main',
                            bgcolor: 'primary.lighter'
                          }}
                        >
                          <DriveFileRenameOutlineIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Typography variant="subtitle1">Coefficient</Typography>}
                        secondary="5 August, 1:45 PM"
                      />
                      <ListItemSecondaryAction>
                        <Stack alignItems="flex-end">
                          <Typography variant="subtitle1" noWrap>
                            + $302
                          </Typography>
                          <Typography variant="h6" color="secondary" noWrap>
                            8%
                          </Typography>
                        </Stack>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            color: 'error.main',
                            bgcolor: 'error.lighter'
                          }}
                        >
                          <SettingsIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={<Typography variant="subtitle1">Status</Typography>} secondary="7 hours ago" />
                      <ListItemSecondaryAction>
                        <Stack alignItems="flex-end">
                          <Typography variant="subtitle1" noWrap>
                            + $682
                          </Typography>
                          <Typography variant="h6" color="secondary" noWrap>
                            16%
                          </Typography>
                        </Stack>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                  </Card>
                </div>
                {/*<div className="w-full flex-row">*/}
                {/*  <Grid container alignItems="center" justifyContent="space-between">*/}
                {/*    <Grid item>*/}
                {/*      <Typography variant="h5">Full Description</Typography>*/}
                {/*    </Grid>*/}
                {/*    <Grid item />*/}
                {/*  </Grid>*/}
                {/*  <Card sx={{ mt: 2 }} content={false}>*/}
                {/*    dfds fds fds fds fds fds fds dsf fds fds fds f dsfd sfds*/}
                {/*    f dsfds fds fds f sdfsd fsd fs df sdf dsf ds fsd fsd fds*/}
                {/*    fds fds fs df sdf sd fds fsd fsd f dsfds fds fds fds fds*/}
                {/*    fds fds fds fsd fsd fsd fsd fds sd fsd fs fsd fds fsd ds*/}

                {/*  </Card>*/}
                {/*</div>*/}


              </TabPanel>

              <TabPanel value="2">
                <Card>
                  fdsf sd
                  f dsfds fds
                  fds fdsfds
                  fds fds fds
                  fds fds fds fds
                </Card>

              </TabPanel>


              <TabPanel value="3">

              </TabPanel>


            </TabContext>
          </Box>

        </Card>
      </div>
    </Page>


  );
}
