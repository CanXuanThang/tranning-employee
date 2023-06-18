import { useState } from 'react';
import logo from '../../../imagies/Rectangle4.png';
import { ILoginParams } from '../../../models/auth';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { setUserInfo } from '../redux/authReducer';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { ROUTES } from '../../../configs/routes';
import { replace } from 'connected-react-router';
import LoginForm from '../components/LoginForm';
import './LoginPage.scss';
import axios from 'axios';
import Footer from './employeeManagement/layouts/footer/Footer';

const LoginPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const onLogin = async (values: ILoginParams) => {
    try {
      const json = await axios.post('https://api-training.hrm.div4.pgtest.co/api/v1/login', {
        username: values.username,
        password: values.password,
        company_id: values.company_id,
      });

      if (json?.status === RESPONSE_STATUS_SUCCESS) {
        setErrorSnackbarOpen(false);
        dispatch(setUserInfo(json.data));
        Cookies.set(ACCESS_TOKEN_KEY, json.data.data.token);
        dispatch(replace(ROUTES.employee));
        return;
      }
    } catch {
      setErrorSnackbarOpen(true);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: '#f8f9fa',
      }}
    >
      <img src={logo} alt="" style={{ width: '100px', height: '100px', marginTop: '64px' }} />
      <h3 className="title">HR Management System</h3>

      <LoginForm onLogin={onLogin} setErr={errorSnackbarOpen} />

      <Footer />
    </div>
  );
};

export default LoginPage;
