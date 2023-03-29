import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Stack,
  TableRow,
  TableCell,
  Typography,
  Chip, Link, Avatar
} from '@mui/material';
// components
import { ItemsMoreMenu } from '/src/components/sections/dashboard/item';
// mock
import { dateFormat, isEmptyAddress, priceFeedByContract } from '../../utilits';
import { Status } from "./Status";
import { useContext } from "react";
import { Web3Context } from "../../context/Web3Context";

// ----------------------------------------------------------------------


export const PriceRow = ({ item }) => {
  const { chains } = useContext(Web3Context);
  const nativeCurrency = chains[0].nativeCurrency;
  return (
    <TableRow
      hover
      key={item.id}
      tabIndex={-1}
      role="checkbox"
    >
      <TableCell component="th" scope="row">
        <Link underline="none" component={RouterLink} to={`/price/${item.id}`}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {item.name}
            </Typography>
          </Stack>
        </Link>
      </TableCell>

      <TableCell align="left"> <Typography variant="subtitle2"
                                           noWrap>{item.s_paid_maker + '' + nativeCurrency.symbol}</Typography></TableCell>
      <TableCell align="left">{item.s_cof}</TableCell>

      <TableCell align="left"> <Typography variant="subtitle2"
                                           noWrap>{item.winingAmount + '' + nativeCurrency.symbol}</Typography></TableCell>
      <TableCell align="left">
        <Typography variant="subtitle2" noWrap>
          {
            item.prediction_type ?
              (<div className="flex">
                <Avatar className="mr-2 h-[20px] w-[20px] " alt={item.name} src={item.tokenDetails?.logo}/>

                <span>Less than </span>
                <span className=" ml-2 text-red-500">{item.prediction_price}$</span>
              </div>)
              :
              (<div className="flex">
                <Avatar className="mr-2 h-[20px] w-[20px]" alt={item.name} src={item.tokenDetails?.logo}/>

                <span>More than </span>
                <span className="ml-2 text-green-500">{item.prediction_price}$</span>
              </div>)

          }


        </Typography>


      </TableCell>

      <TableCell className="text-green-500" align="left">{item.s_maker}</TableCell>
      <TableCell className="text-red-500" align="left">{(isEmptyAddress(item.taker)) ? 'not defined' : item.s_taker}</TableCell>
      <TableCell align="left">{dateFormat(item.deadline_date)}</TableCell>
      <TableCell align="left">

        <Status item={item}/>
      </TableCell>


      <TableCell align="right">
        <ItemsMoreMenu item={item}/>
      </TableCell>
    </TableRow>
  );
}