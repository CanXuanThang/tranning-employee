import Home from '../../../home/Home';
import HeaderContent from '../header/HeaderContent';
import Toolbar from '@mui/material/Toolbar';
import Option from './options/Option';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import axios from 'axios';
import { API_PATHS } from '../../../../../../configs/api';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../../../../utils/constants';
import { setDataUpdate } from '../../../../redux/employeeReducer';
import { Params } from '../../../../../../models/employee';

function AddEmployee() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const params: Params = useParams();

  useEffect(() => {
    if (Object.keys(params).length !== 0) {
      axios
        .get(`${API_PATHS.employee}/${params.id}`, {
          headers: {
            Authorization: 'Bearer ' + Cookies.get(ACCESS_TOKEN_KEY),
          },
        })
        .then((res) => {
          dispatch(setDataUpdate(res.data.data));
        })
        .catch((err) => console.log(err));
    } else {
      dispatch(setDataUpdate(null));
    }
  }, [params, dispatch]);

  return (
    <Home>
      <Toolbar />
      <HeaderContent name={Object.keys(params).length !== 0 ? 'Edit Employee' : 'Add new employee'} bool={false} />
      <Option />
    </Home>
  );
}

export default AddEmployee;
