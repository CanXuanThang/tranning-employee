import { ILoginParams, ILoginValidation } from '../../models/auth';
import { EmployeeParams, EmployeeValidate } from '../../models/employee';
import { ISignUpParams, ISignUpValidation } from '../../models/singup';

const validateEmail = (username: string) => {
  if (!username) {
    return 'usernameRequire';
  }

  return '';
};

const validatePassword = (password: string) => {
  if (!password) {
    return 'passwordRequire';
  }

  if (password.length < 4) {
    return 'minPasswordInvalid';
  }

  return '';
};

const validateFactory = (factory: number) => {
  if (!factory) {
    return 'factoryRequire';
  }
  return '';
};

const validateRepeatPassword = (password: string, repeatPassword: string) => {
  if (!repeatPassword) {
    return 'passwordRequire';
  }

  if (password.length < 8 && password.length > 16) {
    return 'minPasswordInvalid';
  }

  if (password !== repeatPassword) {
    return 'matchPasswordInvalid';
  }

  return '';
};

export const validateLogin = (values: ILoginParams): ILoginValidation => {
  return {
    username: validateEmail(values.username),
    password: validatePassword(values.password),
    factory: validateFactory(Number(values.company_id)),
  };
};

export const validLogin = (values: ILoginValidation) => {
  return !values.username && !values.password;
};

export const validateSignUp = (values: ISignUpParams): ISignUpValidation => {
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
    repeatPassword: validateRepeatPassword(values.password, values.repeatPassword),
  };
};

export const validSignUp = (values: ISignUpValidation) => {
  return !values.email && !values.password && !values.repeatPassword;
};

const validateName = (name: string) => {
  if (!name) {
    return 'nameRequire';
  }
  if (name.length > 50) {
    return 'maxximumValid50';
  }
  return '';
};

const validateGender = (gender: any) => {
  if (gender === '') {
    return 'genderRequire';
  }
};

const validateKtp = (ktp_no: any) => {
  if (!ktp_no) {
    return 'ktpRequire';
  }
  if (ktp_no.length > 20) {
    return 'maxximumValid20';
  }
  return '';
};

const validateNcId = (ncId: any) => {
  if (!ncId) {
    return 'ncIdRequire';
  }
  if (ncId.length > 20) {
    return 'maxximumValid20';
  }
  return '';
};

const validateFieldMother = (mother_name: string) => {
  if (mother_name && mother_name.length > 50) {
    return 'maxximumValid50';
  }
  return '';
};

const validateFieldPob = (pob: string) => {
  if (pob && pob.length > 50) {
    return 'maxximumValid50';
  }
  return '';
};

const validateFieldAddress1 = (home_address_1: string) => {
  if (home_address_1 && home_address_1.length > 100) {
    return 'maxximumValid100';
  }
  return '';
};

const validateFieldAddress2 = (home_address_2: string) => {
  if (home_address_2 && home_address_2.length > 100) {
    return 'maxximumValid100';
  }
  return '';
};

const validateFieldMobileNo = (mobile_no: string) => {
  if (mobile_no && mobile_no.length > 20) {
    return 'maxximumValid20';
  }
  return '';
};

const validateFieldTelNo = (tel_no: string) => {
  if (tel_no && tel_no.length > 20) {
    return 'maxximumValid20';
  }
  return '';
};

const validateFieldBankCardNo = (card_number: string) => {
  if (card_number && card_number.length > 30) {
    return 'maxximumValid30';
  }
  return '';
};

const validateFieldBankAccountNo = (bank_account_no: string) => {
  if (bank_account_no && bank_account_no.length > 30) {
    return 'maxximumValid30';
  }
  return '';
};

const validateFieldBankName = (bank_name: string) => {
  if (bank_name && bank_name.length > 100) {
    return 'maxximumValid100';
  }
  return '';
};

const validateFieldFamilyCardName = (family_card_number: string) => {
  if (family_card_number && family_card_number.length > 30) {
    return 'maxximumValid30';
  }
  return '';
};

const validateFieldSafetyInsuranceNo = (safety_insurance_no: string) => {
  if (safety_insurance_no && safety_insurance_no.length > 30) {
    return 'maxximumValid30';
  }
  return '';
};

const validateFieldHealthInsuranceNo = (health_insurance_no: string) => {
  if (health_insurance_no && health_insurance_no.length > 30) {
    return 'maxximumValid30';
  }
  return '';
};

const validateFieldType = (type: string) => {
  if (type === '') {
    return 'type';
  }
  return '';
};

export const validateAddEmployee = (values: EmployeeParams): EmployeeValidate => {
  return {
    name: validateName(values.name),
    gender: validateGender(values.gender),
    mother_name: validateFieldMother(values.mother_name),
    pob: validateFieldPob(values.pob),
    ktp_no: validateKtp(values.ktp_no),
    nc_id: validateNcId(values.nc_id),
    home_address_1: validateFieldAddress1(values.home_address_1),
    home_address_2: validateFieldAddress2(values.home_address_2),
    mobile_no: validateFieldMobileNo(values.mobile_no),
    tel_no: validateFieldTelNo(values.tel_no),
    bank_account_no: validateFieldBankAccountNo(values.bank_account_no),
    card_number: validateFieldBankCardNo(values.card_number),
    bank_name: validateFieldBankName(values.bank_name),
    family_card_number: validateFieldFamilyCardName(values.family_card_number),
    safety_insurance_no: validateFieldSafetyInsuranceNo(values.safety_insurance_no),
    health_insurance_no: validateFieldHealthInsuranceNo(values.health_insurance_no),
  };
};

export const validateType = (props: any): any => {
  return {
    type: validateFieldType(props.type),
  };
};

export const validType = (props: any) => {
  return !props.type;
};

export const validAddEmployee = (values: EmployeeValidate) => {
  return (
    !values.gender &&
    !values.mother_name &&
    !values.pob &&
    !values.ktp_no &&
    !values.name &&
    !values.nc_id &&
    !values.home_address_1 &&
    !values.home_address_2 &&
    !values.mobile_no &&
    !values.tel_no &&
    !values.bank_account_no &&
    !values.card_number &&
    !values.bank_name &&
    !values.family_card_number &&
    !values.safety_insurance_no &&
    !values.health_insurance_no
  );
};
