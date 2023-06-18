import axios from 'axios';
import { API_PATHS } from '../../../../../../configs/api';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../../../../utils/constants';
import { RESPONSE_STATUS_SUCCESS } from '../../../../../../utils/httpResponseCode';
import { toast } from 'react-toastify';

export const addEmployee = async (dataAdd: any, updateFileContract: any, uploadDocument: any) => {
  const json = await axios.post(API_PATHS.employee, dataAdd, {
    headers: {
      Authorization: 'Bearer ' + Cookies.get(ACCESS_TOKEN_KEY),
    },
  });

  if (updateFileContract.length > 0) {
    const formData1 = new FormData();
    formData1.append('employee_id', json.data.data.id);
    for (let i = 0; i < updateFileContract.length; i++) {
      formData1.append('names[]', updateFileContract[i].name);
      formData1.append('contract_dates[]', updateFileContract[i].contract_date);
      const file = updateFileContract[i].fileList[0];
      formData1.append('documents[]', file, file.name);
    }
    await axios.post(API_PATHS.uploadFileContract, formData1, {
      headers: {
        Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  if (uploadDocument !== undefined && uploadDocument !== null && uploadDocument.length > 0) {
    const formData2 = new FormData();
    formData2.append('employee_id', json.data.data.id);
    for (let i = 0; i < uploadDocument.length; i++) {
      const file = uploadDocument[i].file[0];
      formData2.append('documents[]', file, file.name);
    }

    await axios.post(API_PATHS.uploadDocument, formData2, {
      headers: {
        Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  if (json.status === RESPONSE_STATUS_SUCCESS) {
    toast.success('Success message');
  }
};

export const updateEmployee = async (
  number: any,
  dataUpdate: any,
  deleteDocument: any,
  updateFileContract: any,
  uploadDocument: any,
) => {
  const json = await axios.put(`${API_PATHS.employee}/${number}`, dataUpdate, {
    headers: {
      Authorization: 'Bearer ' + Cookies.get(ACCESS_TOKEN_KEY),
    },
  });

  if (updateFileContract.length > 0) {
    const formData1 = new FormData();
    formData1.append('employee_id', number);
    for (let i = 0; i < updateFileContract.length; i++) {
      formData1.append('names[]', updateFileContract[i].name);
      formData1.append('contract_dates[]', updateFileContract[i].contract_date);
      const file = updateFileContract[i].fileList[0];
      formData1.append('documents[]', file, file.name);
    }
    await axios.post(API_PATHS.uploadFileContract, formData1, {
      headers: {
        Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  const formData1 = new FormData();
  formData1.append('employee_id', number);
  if (deleteDocument.length > 0) {
    for (let i = 0; i < deleteDocument.length; i++) {
      formData1.append('deleted_ids[]', deleteDocument[i]);
    }
  }
  if (uploadDocument.length > 0) {
    for (let i = 0; i < updateFileContract.length; i++) {
      const file = uploadDocument[i].file[0];
      formData1.append('documents[]', file, file.name);
    }
  }
  await axios.post(API_PATHS.uploadDocument, formData1, {
    headers: {
      Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  if (json.status === RESPONSE_STATUS_SUCCESS) {
    toast.success('Success message');
  }
};
