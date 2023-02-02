import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Chip, Link
} from '@mui/material';
// components
import Page from '/src/components/Page';
import SearchNotFound from '/src/components/SearchNotFound';
import { ItemsListHead, ItemsFilterToolbar, ItemsMoreMenu } from '/src/components/sections/dashboard/item';
// mock
import { useContractRead } from 'wagmi';
import Abi from '/src/contractsData/Challenge.json'
import ContractAddress from '/src/contractsData/CustomChallenge-address.json'
import { filterEmpty, customTransform } from '../utilits/customTransform';
import { dateFormat, isEmptyAddress } from '../utilits';
import { customTransform } from "../utilits/customTransform";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'maker', label: 'Initiator', alignRight: false },
  { id: 'taker', label: 'Opponent', alignRight: false },
  { id: 'bid', label: 'Bid Amount', alignRight: false },
  { id: 'cof', label: 'Coefficient', alignRight: false },
  { id: 'created_date', label: 'Created at', alignRight: false },
  { id: 'deadline_date', label: 'Deadline', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },

];

// ----------------------------------------------------------------------

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const applySortFilter = (array, comparator, query) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}


const TableChallenges = (items) => {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');


  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

  const filteredItems = applySortFilter(items, getComparator(order, orderBy), filterName);

  const isItemNotFound = filteredItems.length === 0;


  return (
    <Page className="max-w-[1350px] mx-auto" title="Challenges">
      <div>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Challenges
          </Typography>
          <Button variant="contained" component={RouterLink} to="/create" startIcon={''}>
            New Challenges
          </Button>
        </Stack>

        <Card>
          <ItemsFilterToolbar filterName={filterName} onFilterName={handleFilterByName} />

          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <ItemsListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={items.length}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {filteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => {

                  return (
                    <TableRow
                      hover
                      key={item.id}
                      tabIndex={-1}
                      role="checkbox"
                    >
                      <TableCell component="th" scope="row">
                        <Link underline="none" component={RouterLink} to={`/challenges/${item.id}`}>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {item.name}
                            </Typography>
                          </Stack>
                        </Link>
                      </TableCell>
                      <TableCell className="text-green-500" align="left">{item.s_maker}</TableCell>
                      <TableCell className="text-red-500" align="left">{(isEmptyAddress(item.taker)) ? 'not defined' : item.s_taker}</TableCell>
                      <TableCell align="left"> <Typography variant="subtitle2" noWrap>{item.s_paid_maker}Ξ</Typography></TableCell>
                      <TableCell align="left">{item.s_cof}</TableCell>
                      <TableCell align="left">{dateFormat(item.created_date)}</TableCell>
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
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isItemNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <SearchNotFound searchQuery={filterName} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={items.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </div>
    </Page>
  );
}
export default TableChallenges;