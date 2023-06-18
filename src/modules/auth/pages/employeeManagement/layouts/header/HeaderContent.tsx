import { Box, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import SearchBar from './SeachBar';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { push } from 'connected-react-router';
import { ROUTES } from '../../../../../../configs/routes';
import { useEffect, useMemo, useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router';
import { addEmployee, updateEmployee } from './employee';
import { Params } from '../../../../../../models/employee';

interface Props {
  name: string;
  bool: boolean;
}

const HeaderContent = ({ name, bool }: Props) => {
  const [disable, setDisable] = useState<boolean>(true);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const formPersonalInfomation = useSelector((state: any) => state.employee.formPersonalInformation);
  const formContractInfomation = useSelector((state: any) => state.employee.formContractInformation);
  const formEmployeeDatail = useSelector((state: any) => state.employee.formEmployeeDetail);
  const formOther = useSelector((state: any) => state.employee.formOther);
  const formSalaryNWage = useSelector((state: any) => state.employee.formSalaryNWage);
  let updateFileContract = useSelector((state: any) => state.employee.updateFileContract);
  let uploadDocument = useSelector((state: any) => state.employee.uploadDocument);
  const deleteDocument = useSelector((state: any) => state.employee.deleteDocument);
  const userId = { account_user_id: null, shift: 1 };
  const params: Params = useParams();
  const id = { id: params.id, account_user_id: null, shift: 1, user: null, userAccount: null };
  let dataAdd = useMemo(
    () => ({
      ...formPersonalInfomation,
      ...formContractInfomation,
      ...formEmployeeDatail,
      ...formOther,
      ...formSalaryNWage,
      ...userId,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formPersonalInfomation, formContractInfomation, formEmployeeDatail, formOther, formSalaryNWage],
  );
  let dataUpdate = useMemo(
    () => ({
      ...formPersonalInfomation,
      ...formContractInfomation,
      ...formEmployeeDatail,
      ...formOther,
      ...formSalaryNWage,
      ...id,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formPersonalInfomation, formContractInfomation, formEmployeeDatail, formOther, formSalaryNWage],
  );
  useEffect(() => {
    if (
      dataAdd.name !== '' &&
      dataAdd.gender !== '' &&
      dataAdd.dob !== undefined &&
      dataAdd.ktp_no !== '' &&
      dataAdd.nc_id !== '' &&
      dataAdd.contract_start_date !== undefined &&
      dataAdd.type !== ''
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [dataAdd]);

  const handleAddEmployee = async () => {
    await addEmployee(dataAdd, updateFileContract, uploadDocument);
    dataAdd = null;
    updateFileContract = null;
    uploadDocument = null;
    dispatch(push(ROUTES.employee));
  };

  const handleUpdateEmployee = async () => {
    await updateEmployee(params.id, dataUpdate, deleteDocument, updateFileContract, uploadDocument);
    dataUpdate = null;
    dispatch(push(ROUTES.employee));
  };

  return (
    <Box sx={{ marginBottom: '20px' }}>
      <ToastContainer position="bottom-right" style={{ zIndex: 99999 }} />
      <List className="d-flex align-items-center p-0">
        {name ? (
          <ListItem sx={{ padding: 0, marginLeft: '3px' }}>
            <ListItemText
              sx={{
                maxWidth: '50px',
                span: { fontSize: '14px', fontWeight: 400, fontFamily: 'SVN-Sofia-Regular', display: 'inline-block' },
                color: 'rgb(104, 112, 118)',
                cursor: 'pointer',
              }}
              onClick={() => dispatch(push(ROUTES.home))}
            >
              Gereral
            </ListItemText>
            <span className="mx-2">›</span>
            <ListItemText
              sx={{
                maxWidth: '200px',
                span: { fontSize: '14px', fontFamily: 'SVN-Sofia-Regular', display: 'inline-block' },
              }}
            >
              {name}
            </ListItemText>
          </ListItem>
        ) : null}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontFamily: 'SVN-Sofia-Medium', fontWeight: 500, fontSize: '36px', margin: 0 }}
        >
          {name}
        </Typography>
        {bool ? (
          <SearchBar />
        ) : (
          <Box>
            {params.id ? (
              <Button
                sx={{
                  textTransform: 'none',
                  padding: '8px 22px',
                  backgroundColor: disable ? 'rgba(193, 200, 205, 0.24)' : 'rgb(0, 145, 255)',
                  minWidth: '78px',
                  height: '48px',
                  fontWeight: '400',
                  fontFamily: 'SVN-Sofia-Regular',
                  fontSize: '16px',
                  color: disable ? 'rgba(193, 200, 205, 0.8)' : 'rgb(251, 253, 255)',
                  '&:hover': { backgroundColor: 'rgb(0, 129, 241)' },
                }}
                disabled={disable}
                onClick={handleUpdateEmployee}
              >
                Save Change
              </Button>
            ) : (
              <Button
                sx={{
                  textTransform: 'none',
                  padding: '8px 22px',
                  backgroundColor: disable ? 'rgba(193, 200, 205, 0.24)' : 'rgb(0, 145, 255)',
                  minWidth: '78px',
                  height: '48px',
                  fontWeight: '400',
                  fontFamily: 'SVN-Sofia-Regular',
                  fontSize: '16px',
                  color: disable ? 'rgba(193, 200, 205, 0.8)' : 'rgb(251, 253, 255)',
                  '&:hover': { backgroundColor: 'rgb(0, 129, 241)' },
                }}
                disabled={disable}
                onClick={handleAddEmployee}
              >
                Add
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HeaderContent;
