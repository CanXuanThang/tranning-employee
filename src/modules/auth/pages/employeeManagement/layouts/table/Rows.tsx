import { Checkbox, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { push } from 'connected-react-router';
import { ROUTES } from '../../../../../../configs/routes';

interface Props {
  checked: boolean;
  columns: any;
  row: any;
  listCheck: any;
}

function Rows(props: Props) {
  const { checked, columns, row, listCheck } = props;
  const [isChecked, setIsChecked] = useState<boolean>(checked);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    const { name, checked } = event.target;
    if (checked) {
      listCheck((prev: any) => [...prev, Number(name)]);
    } else {
      listCheck((prevNames: any) => prevNames.filter((prevName: any) => prevName !== Number(name)));
    }
  };

  const handleChecked = () => {
    setIsChecked(!isChecked);
  };

  const handleDoubleClick = (row: any) => {
    dispatch(push(ROUTES.update(row.id)));
  };

  return (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      onClick={handleChecked}
      onDoubleClick={() => handleDoubleClick(row)}
      sx={{ backgroundColor: isChecked ? 'rgb(233, 249, 238)' : 'rgb(248, 249, 250)' }}
    >
      <TableCell>
        <Checkbox checked={isChecked} name={String(row.id)} onChange={handleCheck} color="success" />
      </TableCell>
      {columns.map((column: any) => {
        const value = row[column.id];

        if (column.id === 'home_address') {
          return (
            <React.Fragment key={column.id}>
              <TableCell key={`${column.id}_1`}>{value.home_address_1}</TableCell>
              <TableCell key={`${column.id}_2`}>{value.home_address_2}</TableCell>
            </React.Fragment>
          );
        } else {
          return <TableCell key={column.id}>{value}</TableCell>;
        }
      })}
    </TableRow>
  );
}

export default Rows;
