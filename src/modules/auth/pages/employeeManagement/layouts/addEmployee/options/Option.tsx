import { Box, Button } from '@mui/material';
import PersonalInformation from './forms/personalInfomation/PersonalInformation';
import { useState } from 'react';
import ContractInformation from './forms/contractInformation/ContractInformation';
import EmploymentDetails from './forms/employmentDetails/EmploymentDetails';
import SalaryNWage from './forms/salaryNwages/SalaryNWage';
import Other from './forms/others/Other';
import Footer from '../../footer/Footer';
import { useSelector } from 'react-redux';

const tagSvg = (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    style={{ marginLeft: '4px' }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.4998 18.3337C15.1022 18.3337 18.8332 14.6027 18.8332 10.0003C18.8332 5.39795 15.1022 1.66699 10.4998 1.66699C5.89746 1.66699 2.1665 5.39795 2.1665 10.0003C2.1665 14.6027 5.89746 18.3337 10.4998 18.3337Z"
      stroke="#FFB7B9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M10.5 6.66699V10.0003"
      stroke="#FFB7B9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path d="M10.5 13.333H10.5083" stroke="#FFB7B9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
);

const options = [
  {
    title: 'Employee Infomation',
    svg: tagSvg,
    colorButton: 'rgb(237, 246, 255)',
    value: 0,
  },
  {
    title: 'Contract Information',
    svg: tagSvg,
    colorButton: 'rgb(237, 246, 255)',
    value: 1,
  },
  {
    title: 'Employment Details',
    value: 2,
  },
  {
    title: 'Salary & Wages',
    value: 3,
  },
  {
    title: 'Others',
    value: 4,
  },
];

const components = [PersonalInformation, ContractInformation, EmploymentDetails, SalaryNWage, Other];

function Option() {
  const [component, setComponent] = useState<number>(0);
  const [err, setErr] = useState<boolean>(false);
  const formPersonalInfomation = useSelector((state: any) => state.employee.formPersonalInformation);
  const formContractInfomation = useSelector((state: any) => state.employee.formContractInformation);

  const handleButtonClick = (index: number) => {
    setComponent(index);
    if (
      formPersonalInfomation.gender === '' &&
      formPersonalInfomation.name === '' &&
      formPersonalInfomation.dob === '' &&
      formPersonalInfomation.ktp_no === '' &&
      formPersonalInfomation.nc_id === '' &&
      formContractInfomation.contract_start_date === '' &&
      formContractInfomation.type === ''
    ) {
      setErr(true);
    } else {
      setErr(false);
    }
  };

  return (
    <Box>
      <Box sx={{ marginBottom: '16px', gap: '4px', display: 'flex', flexFlow: 'row wrap' }}>
        {options.map((text, index) => (
          <Button
            key={index}
            variant="contained"
            sx={{
              textTransform: 'none',
              padding: '6px 16px',
              minWidth: '180px',
              height: '42px',
              fontWeight: '400',
              fontFamily: 'SVN-Sofia-Regular',
              fontSize: '14px',
              backgroundColor:
                component === text.value
                  ? text.svg && err
                    ? 'rgb(229, 72, 77)'
                    : 'rgb(0, 145, 255)'
                  : text.svg && err
                  ? 'rgba(229, 72, 77, 0.08)'
                  : 'rgb(237, 246, 255)',
              color: component === text.value ? '#fff' : text.svg && err ? 'rgb(229, 72, 77)' : 'rgb(0, 145, 255)',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor:
                  component === text.value
                    ? text.svg && err
                      ? 'rgb(220, 61, 67)'
                      : 'rgb(0, 129, 241)'
                    : text.svg && err
                    ? 'rgba(229, 72, 77, 0.08)'
                    : 'rgba(0, 145, 255, 0.08)',
                boxShadow: 'none',
              },
            }}
            onClick={() => handleButtonClick(index)}
          >
            {text.title}
            {err && text.svg}
          </Button>
        ))}
      </Box>
      {components.map((Component, index) => (
        <Component key={index} bool={index !== component} />
      ))}
      <Footer />
    </Box>
  );
}

export default Option;
