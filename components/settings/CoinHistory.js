import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';

const columns = [
  { id: 'name', label: 'Type', minWidth: 50 },
  { id: 'code', label: 'Game', minWidth: 50 },
  { id: 'population', label: 'Date', minWidth: 50, align: 'right', format: (value) => value.toLocaleString('en-US'), },
  { id: 'size', label: 'Amount', minWidth: 50, align: 'right', format: (value) => value.toLocaleString('en-US'), }
];

function createData(name, code, population, size) {
  return { name, code, population, size };
}

const rows = [
  createData('Role Purchase', 'Mafia', "24 JAN", 3287263),
  createData('Host Game', 'Mafia', "24 JAN", 9596961),
  createData('Role Purchase', 'Avalon', "24 JAN", 301340),
  createData('Coin Purchase', 'Resistance', "24 JAN", 9833520),
  createData('Join Game', 'Werewolf', "24 JAN", 9984670),
  createData('Host Game', 'Resistance', "24 JAN", 7692024),
  createData('Premium Credit', 'Mafia', "24 JAN", 357578),
  createData('Video Ad', 'Avalon', "24 JAN", 70273),
  createData('Role Purchase', 'Avalon', "24 JAN", 1972550),
  createData('Role Purchase', 'Resistance', "24 JAN", 377973),
  createData('Role Purchase', 'Werewolf', "24 JAN", 640679),
  createData('Join Game', 'Mafia', "24 JAN", 242495),
  createData('Premium Credit', 'Resistance', "24 JAN", 17098246),
  createData('Coin Purchase', 'Mafia', "24 JAN", 923768),
  createData('Host Game', 'Avalon', "24 JAN", 8515767),
];

export default function CoinHistory() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box className={classes.coinHistory}>
      <Paper sx={{boxShadow:"none", display: "flex", flexDirection: "column", width: '100%' }}>
        <TableContainer sx={{ flex: 1}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    sx={{backgroundColor:"#F2F2F2",fontWeight:"bold"}}
                    key={column.size}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell sx={{fontWeight:"normal" }} key={column.size} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  coinHistory: {
    padding: '1.6rem',
    width: '100%',
    flex: 1,
    display: 'flex',
    alignItems:'stretch',
  }
}));