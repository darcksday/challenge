import { Chip } from "@mui/material";

export const Status = ({ item }) => {

  return (<>
      {(item.status === 'open') && (
        <Chip variant="outlined" className="font-semibold capitalize" label={item.status} size="small" color="primary"/>)}
      {(item.status === 'closed') && (
        <Chip variant="outlined" className="font-semibold capitalize text-gray-600" label={item.status} size="small"/>)}
      {(item.status === 'in play') && (<Chip className="font-semibold capitalize" label={item.status} size="small" color="primary"/>)}

      {(item.status === 'in review') && (
        <Chip variant="outlined" className="font-semibold capitalize " label={item.status} size="small" color="success"/>)}
      {(item.status === 'expired') && (
        <Chip variant="outlined" className="font-semibold capitalize text-gray-600" label={item.status} size="small"/>)}
    </>
  );
}