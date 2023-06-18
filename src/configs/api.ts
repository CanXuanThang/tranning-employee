import { APIHost } from '../utils/constants';

export const API_PATHS = {
  signIn: `${APIHost}/login`,
  forgotPassword: `${APIHost}/forgot-password`,
  employee: `${APIHost}/employee`,
  deleteEmployee: `${APIHost}/employee/multiple-delete`,
  getBenefit: `${APIHost}/benefit?grade_id=undefined`,
  getGrade: `${APIHost}/grade`,
  getUserDetail: `${APIHost}/user/detail`,
  getMarriage: `${APIHost}/marriage`,
  getDepartment: `${APIHost}/department`,
  getPosition: `${APIHost}/position`,
  uploadDocument: `${APIHost}/employee-document/upload`,
  uploadFileContract: `${APIHost}/contract/save-multiple`,
};
