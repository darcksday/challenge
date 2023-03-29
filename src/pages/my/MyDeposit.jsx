import { Link as RouterLink } from 'react-router-dom';
// material
// components
import Page from '/src/components/Page';
import { ConnectButton, lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { useContext } from "react";
import { Web3Context } from "../../context/Web3Context";
import { Avatar, Button, Card, Grid, List, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import { Profile } from "../../components/my/Profile";
import { Deposits } from "../../components/my/Deposits";
// mock


export const MyDeposit = () => {
  const { chains } = useContext(Web3Context);

  return (
    <RainbowKitProvider chains={chains}>


      <Page className="max-w-[1350px] mx-auto p-[24px]" title="Deposits">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Deposit
          </Typography>


        </Stack>
        <Card className="p-[24px]">
          <div>
            <Profile/>
            <Deposits/>
          </div>


        </Card>

      </Page>
    </RainbowKitProvider>

  );
}