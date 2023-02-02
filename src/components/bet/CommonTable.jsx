import { filter } from 'lodash';
import {  useState } from 'react';
// material
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import SearchNotFound from '/src/components/SearchNotFound';
import { ItemsListHead, ItemsFilterToolbar } from '/src/components/sections/dashboard/item';
// mock
import { CustomRow } from "./CustomRow";
import { PriceRow } from "./PriceRow";
// ----------------------------------------------------------------------



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


export const   CommonTable = ({items,type,table_head}) => {
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


    <Card>
      <ItemsFilterToolbar filterName={filterName} onFilterName={handleFilterByName} />

      <TableContainer sx={{ minWidth: 800 }}>
        <Table>
          <ItemsListHead
            order={order}
            orderBy={orderBy}
            headLabel={table_head}
            rowCount={items.length}
            onRequestSort={handleRequestSort}
          />
          <TableBody>

          {   filteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => {

            if (type === "custom") {
              return (<CustomRow key={item.id} item={item}/>)
            } else {
              return (<PriceRow  key={item.id} item={item}/>)
            }
          })
          }

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
  );
}