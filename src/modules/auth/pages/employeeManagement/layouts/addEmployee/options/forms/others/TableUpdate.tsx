import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import '../../../../table/Table.scss';
import { Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../../../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { setDeleteDocument } from '../../../../../../../redux/employeeReducer';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

interface Column {
  id: 'no' | 'document_name' | 'create_at' | 'action';
  label: string;
  minWidth?: number;
}

const columns: readonly Column[] = [
  { id: 'no', label: 'No', minWidth: 20 },
  { id: 'document_name', label: 'Document Name', minWidth: 315 },
  {
    id: 'create_at',
    label: 'Create At',
    minWidth: 315,
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 315,
  },
];

interface Data {
  no: number;
  document_name: string;
  create_at: string;
  action: number;
}

interface Props {
  data: any;
  setData: any;
  dataTableGetApi?: any;
}

export default function TableUpdate({ data, setData, dataTableGetApi }: Props) {
  function createData(no: number, document_name: string, create_at: string, action: any): Data {
    return { no, document_name, create_at, action };
  }
  const [idDelete, setIdDelete] = React.useState<any>([]);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const dataTable = dataTableGetApi.map((item: any, index: number) => {
    const date = new Date(item.created_at);
    const formattedDate = date.toISOString().split('T')[0];
    return {
      no: data !== undefined ? data.length + index + 1 : index + 1,
      name: item.document,
      date: formattedDate,
      id: item.id,
      document: item.document,
    };
  });

  const rows =
    data && data.map((item: any, index: number) => createData(index + 1, item.file[0].name, item.date, index));
  const datas =
    dataTable.length > 0 && dataTable.map((item: any) => createData(item.no, item.name, item.date, item.id));

  const handleDelete = (index: number) => {
    const newDataTable = [...data];
    newDataTable.splice(index, 1);
    setData(newDataTable);
  };

  const handleDeleteId = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.value;
    setIdDelete([...idDelete, Number(id)]);
  };

  React.useEffect(() => {
    dispatch(setDeleteDocument(idDelete));
  }, [idDelete, dispatch]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '0 20px 20px 20px' }}>
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
                            <Button
                              variant="text"
                              color="error"
                              sx={{
                                backgroundColor: 'rgb(255, 239, 239)',
                                textTransform: 'none',
                                padding: '0 12px',
                                minWidth: '40px',
                              }}
                              onClick={() => handleDelete(index)}
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
            {datas &&
              datas.map((row: any, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.no}>
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
                              <a href={row.document_name} target="_blank" rel="noreferrer" style={{ color: '#2e7d32' }}>
                                <FileDownloadIcon />
                              </a>
                            </Button>
                            <Button
                              variant="text"
                              color="error"
                              sx={{
                                backgroundColor: 'rgb(255, 239, 239)',
                                textTransform: 'none',
                                padding: '0 12px',
                                minWidth: '40px',
                              }}
                              value={value}
                              onClick={handleDeleteId}
                            >
                              <DeleteOutlineIcon />
                            </Button>
                          </TableCell>
                        );
                      }
                      if (column.id === 'document_name') {
                        return <TableCell key={column.id}>{value.substring(value.lastIndexOf('/') + 1)}</TableCell>;
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
