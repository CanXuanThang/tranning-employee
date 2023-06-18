export const ROUTES = {
  home: '/home',
  login: '/login',
  signUp: '/sign-up',
  detail: '/detail',
  forgotPassword: '/forgot-password',
  employee: '/employee',
  add: '/employee/create-or-update',
  update: (id: string | number) => `/employee/create-or-update/${id}`,
};
