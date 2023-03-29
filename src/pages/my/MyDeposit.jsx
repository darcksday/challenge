import { Link as RouterLink } from 'react-router-dom';
// material
// components
import Page from '/src/components/Page';
import { ConnectButton, lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { useContext } from "react";
import { Web3Context } from "../../context/Web3Context";
import { Avatar, Button, Card, List, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import { CreateRounded } from "@mui/icons-material";
import { CommonTable } from "../../components/bet/CommonTable";
import { Price } from "../../models/price";
import ShortTextIcon from "@mui/icons-material/ShortText";
// mock


export const MyDeposit = () => {
  const { chains } = useContext(Web3Context);

  return (
    <RainbowKitProvider chains={chains}>


      <Page className="max-w-[1350px] mx-auto" title="Deposits">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Deposit
          </Typography>


          <div className="flex w-full">
            <div className="flex-row w-1/2 mr-4">
              <Card sx={{ mt: 2 }}>
                <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
                  <ListItemButton divider>
                    <Avatar className="mr-3" sx={{
                      color: 'primary.main',
                      bgcolor: 'primary.lighter'
                    }}>
                      <ShortTextIcon/>
                    </Avatar>
                    <ListItemText primary="Name"/>
                    <Typography variant="subtitle1">павпвпав</Typography>
                  </ListItemButton>


                </List>
              </Card>
            </div>
          </div>


          <span className="h-[42px]">

            <ConnectButton theme={lightTheme({
              shadows: {
                connectButton: '...',
                walletLogo: '...',
              },
            })} showBalance={true} accountStatus="avatar"/>

          </span>
        </Stack>


      </Page>
    </RainbowKitProvider>

  );
}