import { Box, FormControl, InputBase, MenuItem, Select, Stack } from '@mui/material';
import ContainerField from './ContainerField';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_PATHS } from '../../../../../../../../../../configs/api';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../../../../../../../../utils/constants';
import { EmployeeParams } from '../../../../../../../../../../models/employee';
import { validAddEmployee, validateAddEmployee } from '../../../../../../../../utils';
import { FormattedMessage } from 'react-intl';

interface Props {
  dataForm: any;
}

function InfoForm2({ dataForm }: Props) {
  const [validateForm, setValidateForm] = useState<any>({
    mobile_no: '',
    marriage_id: '',
    tel_no: '',
    card_number: '',
    bank_account_no: '',
    bank_name: '',
    family_card_number: '',
    safety_insurance_no: '',
    health_insurance_no: '',
  });
  const [validate, setValidate] = useState<any>();
  const [marriage, setMarriage] = useState<any>([]);

  useEffect(() => {
    axios
      .get(API_PATHS.getMarriage, {
        headers: {
          Authorization: 'Bearer ' + Cookies.get(ACCESS_TOKEN_KEY),
        },
      })
      .then((res) => setMarriage(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const validateAndHandle = (form: EmployeeParams) => {
    const validate = validateAddEmployee(form);
    setValidate(validate);
    if (!validAddEmployee(validate)) {
      return;
    }
  };

  useEffect(() => {
    validateAndHandle(validateForm);
  }, [validateForm]);

  const dataItem = useSelector((state: any) => state.employee.dataUpdate);

  useEffect(() => {
    if (dataItem) {
      setValidateForm({
        ...validateForm,
        mobile_no: dataItem.mobile_no ? dataItem.mobile_no : '',
        marriage_id: dataItem.marriage_id ? dataItem.marriage_id : '',
        tel_no: dataItem.tel_no ? dataItem.tel_no : '',
        card_number: dataItem.card_number ? dataItem.card_number : '',
        bank_account_no: dataItem.bank_account_no ? dataItem.bank_account_no : '',
        bank_name: dataItem.bank_name ? dataItem.bank_name : '',
        family_card_number: dataItem.family_card_number ? dataItem.family_card_number : '',
        safety_insurance_no: dataItem.safety_insurance_no ? dataItem.safety_insurance_no : '',
        health_insurance_no: dataItem.health_insurance_no ? dataItem.health_insurance_no : '',
      });
    } else {
      setValidateForm({
        ...validateForm,
        mobile_no: '',
        marriage_id: '',
        tel_no: '',
        card_number: '',
        bank_account_no: '',
        bank_name: '',
        family_card_number: '',
        safety_insurance_no: '',
        health_insurance_no: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataItem]);

  useEffect(() => {
    dataForm(validateForm);
  }, [dataForm, validateForm]);
  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ flex: '1 1 0%', paddingLeft: '20px', paddingRight: '20px', gap: '10px' }}
    >
      <ContainerField nameField="mobileNo">
        <InputBase
          sx={{
            backgroundColor: !!validate?.mobile_no ? 'rgb(255, 239, 239)' : 'rgb(241, 243, 245)',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          value={validateForm.mobile_no}
          type="number"
          onChange={(e) => setValidateForm({ ...validateForm, mobile_no: e.target.value })}
        />
        {!!validate?.mobile_no && (
          <small className="text-danger">
            <FormattedMessage id={validate?.mobile_no} />
          </small>
        )}
      </ContainerField>
      <ContainerField nameField="telNo">
        <InputBase
          sx={{
            backgroundColor: !!validate?.tel_no ? 'rgb(255, 239, 239)' : 'rgb(241, 243, 245)',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          value={validateForm.tel_no}
          type="number"
          onChange={(e) => setValidateForm({ ...validateForm, tel_no: e.target.value })}
        />
        {!!validate?.tel_no && (
          <small className="text-danger">
            <FormattedMessage id={validate?.tel_no} />
          </small>
        )}
      </ContainerField>
      <ContainerField nameField="marriageStatus">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <Select
              value={validateForm.marriage_id}
              onChange={(e) => {
                setValidateForm({ ...validateForm, marriage_id: e.target.value });
              }}
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{
                backgroundColor: 'rgb(241, 243, 245)',
                div: { padding: '12px' },
              }}
              displayEmpty
              className="ip"
            >
              <MenuItem value="" id="menu-item-1">
                <em
                  style={{
                    fontSize: '16px',
                    fontFamily: 'SVN-Sofia-Regular',
                    fontStyle: 'normal',
                    color: 'rgb(104, 112, 118)',
                  }}
                >
                  Choose Marriage Status
                </em>
              </MenuItem>
              {marriage.map((option: any) => (
                <MenuItem key={option.id} className="menu-item" value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </ContainerField>
      <ContainerField nameField="bankCardNo">
        <InputBase
          sx={{
            backgroundColor: !!validate?.card_number ? 'rgb(255, 239, 239)' : 'rgb(241, 243, 245)',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          value={validateForm.card_number}
          type="number"
          onChange={(e) => setValidateForm({ ...validateForm, card_number: e.target.value })}
        />
        {!!validate?.card_number && (
          <small className="text-danger">
            <FormattedMessage id={validate?.card_number} />
          </small>
        )}
      </ContainerField>
      <ContainerField nameField="bankAccountNo">
        <InputBase
          sx={{
            backgroundColor: !!validate?.bank_account_no ? 'rgb(255, 239, 239)' : 'rgb(241, 243, 245)',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          value={validateForm.bank_account_no}
          type="number"
          onChange={(e) => setValidateForm({ ...validateForm, bank_account_no: e.target.value })}
        />
        {!!validate?.bank_account_no && (
          <small className="text-danger">
            <FormattedMessage id={validate?.bank_account_no} />
          </small>
        )}
      </ContainerField>
      <ContainerField nameField="bankName">
        <InputBase
          sx={{
            backgroundColor: !!validate?.bank_name ? 'rgb(255, 239, 239)' : 'rgb(241, 243, 245)',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          value={validateForm.bank_name}
          onChange={(e) => setValidateForm({ ...validateForm, bank_name: e.target.value })}
        />
        {!!validate?.bank_name && (
          <small className="text-danger">
            <FormattedMessage id={validate?.bank_name} />
          </small>
        )}
      </ContainerField>
      <ContainerField nameField="familyCardNumber">
        <InputBase
          sx={{
            backgroundColor: !!validate?.family_card_number ? 'rgb(255, 239, 239)' : 'rgb(241, 243, 245)',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          value={validateForm.family_card_number}
          type="number"
          onChange={(e) => setValidateForm({ ...validateForm, family_card_number: e.target.value })}
        />
        {!!validate?.family_card_number && (
          <small className="text-danger">
            <FormattedMessage id={validate?.family_card_number} />
          </small>
        )}
      </ContainerField>
      <ContainerField nameField="siNo">
        <InputBase
          sx={{
            backgroundColor: !!validate?.safety_insurance_no ? 'rgb(255, 239, 239)' : 'rgb(241, 243, 245)',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          value={validateForm.safety_insurance_no}
          type="number"
          onChange={(e) => setValidateForm({ ...validateForm, safety_insurance_no: e.target.value })}
        />
        {!!validate?.safety_insurance_no && (
          <small className="text-danger">
            <FormattedMessage id={validate?.safety_insurance_no} />
          </small>
        )}
      </ContainerField>
      <ContainerField nameField="hiNo">
        <InputBase
          sx={{
            backgroundColor: !!validate?.health_insurance_no ? 'rgb(255, 239, 239)' : 'rgb(241, 243, 245)',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          value={validateForm.health_insurance_no}
          type="number"
          onChange={(e) => setValidateForm({ ...validateForm, health_insurance_no: e.target.value })}
        />
        {!!validate?.health_insurance_no && (
          <small className="text-danger">
            <FormattedMessage id={validate?.health_insurance_no} />
          </small>
        )}
      </ContainerField>
    </Stack>
  );
}

export default InfoForm2;
