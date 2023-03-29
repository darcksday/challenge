import {
  Avatar,
  Box, Dialog, DialogContent, DialogTitle,
  Typography
} from '@mui/material';
import { useContext, useState } from "react";
import { Web3Context } from "../../context/Web3Context";
import { useBalance } from "wagmi";
import { Tooltip } from "@material-tailwind/react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import QrCodeIcon from '@mui/icons-material/QrCode';
import QRCode from "react-qr-code";


export const Profile = () => {

  const [open, setOpen] = useState(false);
  const { userInfo } = useContext(Web3Context);
  const { data, isError, isSuccess, isLoading } = useBalance({
    cacheTime: 4000,
    watch: true,
    address: userInfo.address,
  });

  const handleClose = () => {
    onClose(selectedValue);
  };


  return !isLoading && (

    <>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={(userInfo?.profileImage) ?? `https://avatars.dicebear.com/api/jdenticon/${userInfo.address}.svg`}

          sx={{
            height: 80,
            mb: 2,
            width: 80
          }}
        />
        <Typography
          gutterBottom
          variant="h5"
        >
          {userInfo?.name}
        </Typography>

        <Typography

          className="text-[#2f378a] mb-0"
          gutterBottom
          variant="subtitle1"
        >
          {userInfo?.address}
          <Tooltip content="Click to Copy Address">

            <ContentCopyIcon onClick={() => navigator.clipboard.writeText(userInfo.address)} strokeWidth={2}
                             className="h-4 w-4 cursor-pointer ml-2"/>
          </Tooltip>
          <Tooltip content="Wallet QR">
            <QrCodeIcon onClick={() => setOpen(true)} strokeWidth={2} className="h-4 w-4 cursor-pointer "/>
          </Tooltip>

        </Typography>

        <Typography
          className="text.secondary"
          variant="button"
        >

          {data.formatted} {data.symbol}


        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >

          {userInfo?.email}
        </Typography>
      </Box>


      <Dialog onClose={() => (setOpen(false))} open={open}>
        <DialogTitle>Wallet QR</DialogTitle>
        <DialogContent>

          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={userInfo.address}
            viewBox={`0 0 256 256`}
          />


        </DialogContent>

      </Dialog>


    </>
  );
}