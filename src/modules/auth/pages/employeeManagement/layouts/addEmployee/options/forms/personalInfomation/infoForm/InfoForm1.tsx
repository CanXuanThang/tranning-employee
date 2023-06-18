import { useEffect, useState } from 'react';
import { Box, FormControl, InputBase, MenuItem, Select, Stack } from '@mui/material';
import ContainerField from './ContainerField';
import { FormattedMessage } from 'react-intl';
import InputDateTime from '../../InputDateTime';
import { EmployeeParams } from '../../../../../../../../../../models/employee';
import { validAddEmployee, validateAddEmployee } from '../../../../../../../../utils';
import { useSelector } from 'react-redux';
import moment from 'moment';

interface Props {
  dataForm: any;
}

function InfoForm1({ dataForm }: Props) {
  const [validate, setValidate] = useState<any>();
  const [date, getDate] = useState<any>(null);
  const [validateForm, setValidateForm] = useState<any>({
    name: '',
    gender: '',
    mother_name: '',
    dob: '',
    pob: '',
    ktp_no: '',
    nc_id: '',
    home_address_1: '',
    home_address_2: '',
    staff_id: '',
  });
  const dataItem = useSelector((state: any) => state.employee.dataUpdate);

  useEffect(() => {
    if (dataItem) {
      setValidateForm({
        ...validateForm,
        name: dataItem.name,
        gender: dataItem.gender,
        mother_name: dataItem.mother_name ? dataItem.mother_name : '',
        dob: dataItem.dob,
        pob: dataItem.pob ? dataItem.pob : '',
        ktp_no: dataItem.ktp_no,
        nc_id: dataItem.nc_id,
        home_address_1: dataItem.home_address_1 ? dataItem.home_address_1 : '',
        home_address_2: dataItem.home_address_2 ? dataItem.home_address_2 : '',
        staff_id: dataItem.staff_id,
      });
      getDate(new Date(dataItem.dob));
    } else {
      setValidateForm({
        ...validateForm,
        name: '',
        gender: '',
        mother_name: '',
        dob: '',
        pob: '',
        ktp_no: '',
        nc_id: '',
        home_address_1: '',
        home_address_2: '',
      });
      getDate(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataItem]);
  useEffect(() => {
    setValidateForm((prevFormContract: any) => ({
      ...prevFormContract,
      dob: date ? moment(date).format('YYYY-MM-DD') : '',
    }));
  }, [date]);

  const handleBlur = () => {
    validateAndHandle(validateForm);
  };

  useEffect(() => {
    if (
      validateForm.gender !== '' ||
      validateForm.ktp_no !== '' ||
      validateForm.name !== '' ||
      validateForm.nc_id !== ''
    ) {
      validateAndHandle(validateForm);
    }
  }, [validateForm]);

  useEffect(() => {
    dataForm(validateForm);
  }, [validateForm, dataForm]);

  const validateAndHandle = (form: EmployeeParams) => {
    const validate = validateAddEmployee(form);
    setValidate(validate);
    if (!validAddEmployee(validate)) {
      return;
    }
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ flex: '1 1 0%', paddingLeft: '20px', paddingRight: '20px', gap: '10px' }}
    >
      {dataItem && (
        <ContainerField nameField="nik">
          <InputBase
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.12)',
              input: { padding: '12px' },
              borderRadius: '6px',
              width: '100%',
            }}
            value={dataItem.staff_id}
            disabled
          />
        </ContainerField>
      )}
      <ContainerField nameField="name" required="*">
        <InputBase
          sx={{
            backgroundColor: !!validate?.name ? 'rgb(255, 239, 239)' : 'rgb(241, 243, 245)',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
            border: !!validate?.name ? '1px solid rgb(243, 174, 175)' : 'none',
          }}
          value={validateForm.name}
          onChange={(e) => {
            setValidateForm({ ...validateForm, name: e.target.value });
          }}
          onBlur={handleBlur}
        />
        {!!validate?.name && (
          <small className="text-danger">
            <FormattedMessage id={validate?.name} />
          </small>
        )}
      </ContainerField>
      <ContainerField nameField="gender" required="*">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <Select
              value={validateForm.gender}
              onChange={(e) => {
                setValidateForm({ ...validateForm, gender: e.target.value });
              }}
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{
                backgroundColor: !!validate?.gender ? 'rgb(255, 239, 239)' : 'rgb(241, 243, 245)',
                border: !!validate?.gender ? '1px solid rgb(243, 174, 175)' : 'none',
                div: { padding: '12px' },
              }}
              displayEmpty
              className="ip"
              onBlur={handleBlur}
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
                  Choose Gender
                </em>
              </MenuItem>
              {['Male', 'Female'].map((option: string, index: number) => (
                <MenuItem key={index} className="menu-item" value={index}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {!!validate?.gender && (
          <small className="text-danger">
            <FormattedMessage id={validate?.gender} />
          </small>
        )}
      </ContainerField>
      <ContainerField nameField="mother_name">
        <InputBase
          sx={{
            backgroundColor: !!validate?.mother_name ? 'rgb(255, 239, 239)' : 'rgb(241, 243, 245)',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          onBlur={handleBlur}
          value={validateForm.mother_name}
          onChange={(e) => setValidateForm({ ...validateForm, mother_name: e.target.value })}
        />
        {!!validate?.mother_name && (
          <small className="text-danger">
            <FormattedMessage id={validate?.mother_name} />
          </small>
        )}
      </ContainerField>
      <ContainerField nameField="dob" required="*">
        <InputDateTime getDate={getDate} date={date} />
      </ContainerField>
      <ContainerField nameField="pob">
        <InputBase
          sx={{
            backgroundColor: !!validate?.pob ? 'rgb(255, 239, 239)' : 'rgb(241, 243, 245)',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          onBlur={handleBlur}
          value={validateForm.pob}
          onChange={(e) => setValidateForm({ ...validateForm, pob: e.target.value })}
        />
        {!!validate?.pob && (
          <small className="text-danger">
            <FormattedMessage id={validate?.pob} />
          </small>
        )}
      </ContainerField>
      <ContainerField nameField="ktp" required="*">
        <InputBase
          sx={{
            backgroundColor: !!validate?.ktp_no ? 'rgb(255, 239, 239)' : 'rgb(241, 243, 245)',
            border: !!validate?.ktp_no ? '1px solid rgb(243, 174, 175)' : 'none',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          value={validateForm.ktp_no}
          onChange={(e) => {
            setValidateForm({ ...validateForm, ktp_no: Number(e.target.value) });
          }}
          type="number"
          onBlur={handleBlur}
        />
        {!!validate?.ktp_no && (
          <small className="text-danger">
            <FormattedMessage id={validate?.ktp_no} />
          </small>
        )}
      </ContainerField>
      <ContainerField nameField="nc_id" required="*">
        <InputBase
          sx={{
            backgroundColor: !!validate?.nc_id ? 'rgb(255, 239, 239)' : 'rgb(241, 243, 245)',
            border: !!validate?.nc_id ? '1px solid rgb(243, 174, 175)' : 'none',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          value={validateForm.nc_id}
          onChange={(e) => {
            setValidateForm({ ...validateForm, nc_id: Number(e.target.value) });
          }}
          type={'number'}
          onBlur={handleBlur}
        />
        {!!validate?.nc_id && (
          <small className="text-danger">
            <FormattedMessage id={validate?.nc_id} />
          </small>
        )}
      </ContainerField>
      <ContainerField nameField="address1">
        <InputBase
          sx={{
            backgroundColor: !!validate?.home_address_1 ? 'rgb(255, 239, 239)' : 'rgb(241, 243, 245)',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          onBlur={handleBlur}
          value={validateForm.home_address_1}
          onChange={(e) => setValidateForm({ ...validateForm, home_address_1: e.target.value })}
        />
        {!!validate?.home_address_1 && (
          <small className="text-danger">
            <FormattedMessage id={validate?.home_address_1} />
          </small>
        )}
      </ContainerField>
      <ContainerField nameField="address2">
        <InputBase
          sx={{
            backgroundColor: !!validate?.home_address_2 ? 'rgb(255, 239, 239)' : 'rgb(241, 243, 245)',
            input: { padding: '12px' },
            borderRadius: '6px',
            width: '100%',
          }}
          onBlur={handleBlur}
          value={validateForm.home_address_2}
          onChange={(e) => setValidateForm({ ...validateForm, home_address_2: e.target.value })}
        />
        {!!validate?.home_address_2 && (
          <small className="text-danger">
            <FormattedMessage id={validate?.home_address_2} />
          </small>
        )}
      </ContainerField>
    </Stack>
  );
}

export default InfoForm1;
