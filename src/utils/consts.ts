import { InputProps } from 'src/elements/input';
import { InputWithLabelProps } from 'src/elements/inputWithLabel';

export const validationParams = {
  login: /^[A-Za-z\d_-]{3,20}$/,
  password: /^[A-Za-z\d_-]{3,20}$/,
  old_password: /^[A-Za-z\d_-]{3,20}$/,
  new_password: /^[A-Za-z\d_-]{3,20}$/,
  message: /^(?!\s*$).+/,
  first_name: /^[A-Za-z\d_-]{3,20}$/,
  second_name: /^[A-Za-z\d_-]{3,20}$/,
  email: /^[A-Za-z\d_-]{3,20}$/,
  phone: /^[A-Za-z\d_-]{3,20}$/,
  search: /^(?!\s*$).+/,
  display_name: /^[A-Za-z\d_-]{3,20}$/,
};

export const validationParams2 = {
  login: [
    { regex: /^[A-Za-z\d_-]{3,20}$/, message: 'err1' },
    { regex: /^(?!\s*$).+/, message: 'err2' },
  ],
};

export const validationFormsConfig2 = {
  login: { name: 'login', config: validationParams2.login },
};

// вообще все инпуты
export type InputsCollectionType = keyof typeof validationParams;

type ValidationFormsType = Record<
  InputsCollectionType,
  {
    name: InputsCollectionType;
    regex: RegExp;
    errorText: string;
  }
>;

// конфиг из которого берем значения для валидации инпутов форм
export const validationFormsConfig: Partial<ValidationFormsType> = {
  login: { name: 'login', regex: validationParams.login, errorText: 'Incorrect login' },
  password: { name: 'password', regex: validationParams.password, errorText: 'Incorrect password' },
  old_password: { name: 'old_password', regex: validationParams.password, errorText: 'Incorrect password' },
  new_password: { name: 'new_password', regex: validationParams.password, errorText: 'Incorrect password' },
  first_name: { name: 'first_name', regex: validationParams.first_name, errorText: 'Incorrect first name' },
  second_name: { name: 'second_name', regex: validationParams.second_name, errorText: 'Incorrect second name' },
  email: { name: 'email', regex: validationParams.email, errorText: 'Incorrect email' },
  phone: { name: 'phone', regex: validationParams.password, errorText: 'Incorrect phone' },
  display_name: { name: 'display_name', regex: validationParams.display_name, errorText: 'Incorrect name to show' },
};

// тип у которого пропсы как у Input, имя из коллекции всех инпутов для форм и label как у InputWithLabel
type InputFormsConfigType = Array<
  Omit<InputProps, 'name'> & Pick<InputWithLabelProps, 'label'> & { name: keyof typeof validationFormsConfig }
>;

export const loginInputsConfig: InputFormsConfigType = [
  {
    label: 'Login',
    name: 'login',
    placeholder: 'Enter your login',
    type: 'text',
  },
  {
    label: 'Password',
    name: 'password',
    placeholder: 'Enter your password',
    type: 'password',
  },
];

export const registrationInputsConfig: InputFormsConfigType = [
  {
    name: 'login',
    placeholder: 'Enter your login',
    type: 'text',
    label: 'Login',
  },
  {
    name: 'first_name',
    placeholder: 'Enter your first name',
    type: 'text',
    label: 'First Name',
  },
  {
    name: 'second_name',
    placeholder: 'Enter your last name',
    type: 'text',
    label: 'Second Name',
  },
  {
    name: 'email',
    placeholder: 'Enter your email address',
    type: 'text',
    label: 'Email',
  },
  {
    name: 'phone',
    placeholder: 'Enter your phone',
    type: 'text',
    label: 'Phone',
  },
  {
    name: 'password',
    placeholder: 'Enter your password',
    type: 'password',
    label: 'Password',
  },
];

export const profileInputsConfig: InputFormsConfigType = [
  {
    name: 'email',
    placeholder: 'Enter your email',
    type: 'text',
    label: 'Email',
  },
  {
    name: 'login',
    placeholder: 'Enter your login',
    type: 'text',
    label: 'Login',
  },
  {
    name: 'first_name',
    placeholder: 'Enter your first name',
    type: 'text',
    label: 'First Name',
  },
  {
    name: 'second_name',
    placeholder: 'Enter your last name',
    type: 'text',
    label: 'Second Name',
  },
  {
    name: 'display_name',
    placeholder: 'Enter name to show',
    type: 'text',
    label: 'Name to show',
  },
  {
    name: 'phone',
    placeholder: 'Enter your phone',
    type: 'text',
    label: 'Phone',
  },
  {
    name: 'old_password',
    placeholder: 'Enter old password',
    type: 'text',
    label: 'Old Password',
  },
  {
    name: 'new_password',
    placeholder: 'Enter new password',
    type: 'text',
    label: 'New Password',
  },
];
