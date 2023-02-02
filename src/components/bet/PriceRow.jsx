import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Stack,
  TableRow,
  TableCell,
  Typography,
  Chip, Link
} from '@mui/material';
// components
import { ItemsMoreMenu } from '/src/components/sections/dashboard/item';
// mock
import { dateFormat, isEmptyAddress } from '../../utilits';
import { useNetwork } from "wagmi";
// ----------------------------------------------------------------------




export const   PriceRow = ({item}) => {
  console.log(item)

  const chain = useNetwork();
  const nativeCurrency=chain.chain.nativeCurrency;

  return (
    <TableRow
      hover
      key={item.id}
      tabIndex={-1}
      role="checkbox"
    >
      <TableCell component="th" scope="row">
        <Link underline="none" component={RouterLink} to={`/price/view/${item.id}`}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {item.name}
            </Typography>
          </Stack>
        </Link>
      </TableCell>

      <TableCell align="left"> <Typography variant="subtitle2" noWrap>{item.s_paid_maker+''+nativeCurrency.symbol}</Typography></TableCell>
      <TableCell align="left">{item.s_cof}</TableCell>

      <TableCell align="left"> <Typography variant="subtitle2" noWrap>{item.winingAmount+''+nativeCurrency.symbol}</Typography></TableCell>
      <TableCell align="left"> <Typography variant="subtitle2" noWrap>{(item.prediction_type)?'More than > ':'Less than <'}
        <span className="text-green-500">{item.prediction_price}$</span>
      </Typography></TableCell>

      <TableCell className="text-green-500" align="left">{item.s_maker}</TableCell>
      <TableCell className="text-red-500" align="left">{(isEmptyAddress(item.taker)) ? 'not defined' : item.s_taker}</TableCell>
      <TableCell align="left">{dateFormat(item.deadline_date)}</TableCell>
      <TableCell align="left">

        {(item.status === 'waiting') && (
          <Chip variant="outlined" className="font-semibold capitalize" label={item.status} size="small" color="primary" />)}
        {(item.status === 'finished') && (<Chip className="font-semibold capitalize" label={item.status} size="small" color="success" />)}
        {(item.status === 'taken') && (<Chip className="font-semibold capitalize" label={item.status} size="small" color="primary" />)}

        {(item.status === 'in review') && (
          <Chip variant="outlined" className="font-semibold capitalize" label={item.status} size="small" color="success" />)}
      </TableCell>


      <TableCell align="right">
        <ItemsMoreMenu item={item} />
      </TableCell>
    </TableRow>
  );
}