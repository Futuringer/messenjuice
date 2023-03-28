export const validationParams = {
  Login: /^[A-Za-z\d_-]{3,20}$/,
  Password: /^[A-Za-z\d_-]{3,20}$/,
  Message: /^(?!\s*$).+/,
};

export const validationFormsConfig = {
  Login: { name: 'Login', regex: validationParams.Login, errorText: 'Incorrect login' },
  Password: { name: 'Password', regex: validationParams.Password, errorText: 'Incorrect password' },
};
