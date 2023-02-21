import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '/src/components/Iconify';
import { useAccount } from 'wagmi';
import ContractAddress from "../../../../contractsData/PriceChallenge-address.json";
import Abi from "../../../../contractsData/PriceChallenge.json";
import useWriteWagmi from "../../../../hooks/useWriteWagmi";
import { Price } from "../../../../models/price";

// ----------------------------------------------------------------------

export default function ItemsMoreMenu({ item }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { address } = useAccount()
  const { setConfig } = useWriteWagmi();

  const remove = () => {
    setConfig(
      {
        'address': item.contract,
        'abi': item.abi,
        'functionName': 'remove',
        'args': [item.id],
      }
    )

  }

  const accept = () => {
    setConfig(
      {
        'address': item.contract,
        'abi': item.abi,
        'functionName': 'accept',
        'args': [item.id],
        'ether': item.accept_payment

      }
    )

  }
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20}/>
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >


        <MenuItem component={RouterLink} to={`${item.id}`} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:eye-outline" width={24} height={24}/>
          </ListItemIcon>
          <ListItemText primary="View" primaryTypographyProps={{ variant: 'body2' }}/>
        </MenuItem>
        {(item.canAccept(address)) && (

          <MenuItem onClick={() => {
            accept();
            setIsOpen(false);
          }
          } sx={{ color: 'text.secondary' }}>
            <ListItemIcon>
              <Iconify icon="eva:checkmark-outline" width={24} height={24}/>
            </ListItemIcon>
            <ListItemText primary="Accept" primaryTypographyProps={{ variant: 'body2' }}/>
          </MenuItem>

        )}
        {(item.canDelete(address)) && (

          <MenuItem onClick={() => {
            remove();
            setIsOpen(false);
          }
          } sx={{ color: 'text.secondary' }}>
            <ListItemIcon>
              <Iconify icon="eva:trash-2-outline" width={24} height={24}/>
            </ListItemIcon>
            <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }}/>
          </MenuItem>

        )}


      </Menu>
    </>
  );
}
