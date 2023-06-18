import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import '../../../../table/Table.scss';
import { Box, Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

interface Column {
  id: 'no' | 'contract_name' | 'sign_date' | 'action';
  label: string;
  minWidth?: number;
}

const columns: readonly Column[] = [
  { id: 'no', label: 'No', minWidth: 20 },
  { id: 'contract_name', label: 'Contract Name', minWidth: 120 },
  {
    id: 'sign_date',
    label: 'Sign Date',
    minWidth: 120,
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 270,
  },
];

interface Data {
  no: number;
  contract_name: string;
  sign_date: string;
  action: number;
  document?: string;
}

interface Props {
  dataTable: any;
  setDataTable: any;
  getData?: any;
}

export default function TableUpdate({ dataTable, setDataTable, getData }: Props) {
  function createData(
    no: number,
    contract_name: string = dataTable.name,
    sign_date: string = dataTable.date,
    action: any,
    document?: string,
  ): Data {
    return { no, contract_name, sign_date, action, document };
  }
  const handleDeleteRow = (index: number) => {
    const newDataTable = [...dataTable];
    newDataTable.splice(index, 1);
    setDataTable(newDataTable);
  };

  const dataGetApi = getData.map((item: any, index: number) => ({
    name: item.name,
    contract_date: item.contract_date,
    id: item.id,
    number: dataTable === undefined ? index + 1 : dataTable.length + index + 1,
    document: item.document,
  }));

  const rows =
    dataTable && dataTable.map((a: any, index: number) => createData(index + 1, a.name, a.contract_date, index));
  const data =
    dataGetApi.length > 0 &&
    dataGetApi.map((item: any) => createData(item.number, item.name, item.contract_date, item.id, item.document));

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '225px', minHeight: '225px', width: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ minWidth: column.minWidth, textAlign: 'center' }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row: any, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.no}>
                    {columns.map((column) => {
                      const value = row[column.id];

                      if (column.id === 'action') {
                        return (
                          <TableCell key={column.id}>
                            <Box sx={{ minWidth: '125px' }}></Box>
                            <Button
                              variant="text"
                              color="error"
                              sx={{
                                backgroundColor: 'rgb(255, 239, 239)',
                                textTransform: 'none',
                                padding: '0 12px',
                                minWidth: '40px',
                              }}
                              onClick={() => handleDeleteRow(index)}
                            >
                              <DeleteOutlineIcon /> Delete
                            </Button>
                          </TableCell>
                        );
                      } else {
                        return <TableCell key={column.id}>{value}</TableCell>;
                      }
                    })}
                  </TableRow>
                );
              })}
            {data &&
              data.map((row: any, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === 'action') {
                        return (
                          <TableCell
                            key={column.id}
                            sx={{ display: 'flex', justifyContent: 'center', padding: 0, borderBottom: 'none' }}
                          >
                            <Button
                              variant="text"
                              color="success"
                              sx={{
                                backgroundColor: 'rgb(233, 249, 238)',
                                textTransform: 'none',
                                padding: '0 12px',
                                minWidth: '40px',
                              }}
                            >
                              <a href={row.document} target="_blank" rel="noreferrer" style={{ color: '#2e7d32' }}>
                                <FileDownloadIcon />
                              </a>
                            </Button>
                            {/* <Button
                              variant="text"
                              color="error"
                              sx={{
                                backgroundColor: 'rgb(255, 239, 239)',
                                textTransform: 'none',
                                padding: '0 12px',
                                minWidth: '40px',
                              }}
                            >
                              <DeleteOutlineIcon /> Delete
                            </Button> */}
                          </TableCell>
                        );
                      } else {
                        return <TableCell key={column.id}>{value}</TableCell>;
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
