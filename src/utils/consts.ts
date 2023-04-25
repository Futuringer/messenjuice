import { InputProps } from 'src/elements/input';
import { InputWithLabelProps } from 'src/elements/inputWithLabel';

export const validationParams = {
  login: [
    { regex: /^[a-zA-Z0-9_-]*$/, message: 'Invalid characters' },
    { regex: /[a-zA-Z]/, message: 'Field must contain at least one letter' },
    { regex: /^.{3,20}$/, message: 'Field must contain from 3 to 20 characters' },
  ],
  password: [
    { regex: /^.{8,40}$/, message: 'Field must contain from 8 to 40 characters' },
    { regex: /[A-Z]/, message: 'Field must contain at least one capital letter' },
    { regex: /[0-9]/, message: 'Field must contain at least one digit' },
  ],
  oldPassword: [
    { regex: /^.{8,40}$/, message: 'Field must contain from 8 to 40 characters' },
    { regex: /[A-Z]/, message: 'Field must contain at least one capital letter' },
    { regex: /[0-9]/, message: 'Field must contain at least one digit' },
  ],
  newPassword: [
    { regex: /^.{8,40}$/, message: 'Field must contain from 8 to 40 characters' },
    { regex: /[A-Z]/, message: 'Field must contain at least one capital letter' },
    { regex: /[0-9]/, message: 'Field must contain at least one digit' },
  ],
  message: [{ regex: /^(?!\s*$).+/, message: '_' }],
  first_name: [
    { regex: /^[a-zA-Zа-яёА-ЯЁ0-9-]*$/, message: 'Invalid characters' },
    { regex: /^[A-Z].+$/, message: 'Field must start with capital letter' },
  ],
  second_name: [
    { regex: /^[a-zA-Zа-яёА-ЯЁ0-9-]*$/, message: 'Invalid characters' },
    { regex: /^[A-Z].+$/, message: 'Field must start with capital letter' },
  ],
  email: [{ regex: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, message: 'Invalid email' }],
  phone: [
    { regex: /^[+0-9].+$/, message: 'Field must start with + or digit' },
    { regex: /^.{10,15}$/, message: 'Field must contain from 10 to 15 characters' },
  ],
  search: [{ regex: /^(?!\s*$).+/, message: '_' }],
  display_name: [
    { regex: /^[a-zA-Zа-яёА-ЯЁ0-9-]*$/, message: 'Invalid characters' },
    { regex: /^[A-Z].+$/, message: 'Field must start with capital letter' },
  ],
  // newChatName: [],
};

export type InputsCollectionType = keyof typeof validationParams;

type InputFormsConfigType = Array<
  Omit<InputProps, 'name'> &
    Pick<InputWithLabelProps, 'label'> & { name: keyof typeof validationParams; value?: string; disabled?: boolean }
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
    path: 'user.data.email',
    disabled: true,
  },
  {
    name: 'login',
    placeholder: 'Enter your login',
    type: 'text',
    label: 'Login',
    path: 'user.data.login',
    disabled: true,
  },
  {
    name: 'first_name',
    placeholder: 'Enter your first name',
    type: 'text',
    label: 'First Name',
    path: 'user.data.first_name',
    disabled: true,
  },
  {
    name: 'second_name',
    placeholder: 'Enter your last name',
    type: 'text',
    label: 'Second Name',
    path: 'user.data.second_name',
    disabled: true,
  },
  {
    name: 'display_name',
    placeholder: 'Enter name to show',
    type: 'text',
    label: 'Name to show',
    path: 'user.data.display_name',
    disabled: true,
  },
  {
    name: 'phone',
    placeholder: 'Enter your phone',
    type: 'text',
    label: 'Phone',
    path: 'user.data.phone',
    disabled: true,
  },
];

export const passwordsInputsConfig: InputFormsConfigType = [
  {
    name: 'oldPassword',
    placeholder: 'Enter old password',
    type: 'password',
    label: 'OldPassword',
    path: 'user.data.oldPassword',
  },
  {
    name: 'newPassword',
    placeholder: 'Enter new password',
    type: 'password',
    label: 'NewPassword',
    path: 'user.data.newPassword',
  },
];

export const infoInputsConfig: InputFormsConfigType = [
  {
    name: 'email',
    placeholder: 'Enter your email',
    type: 'text',
    label: 'Email',
    path: 'user.data.email',
  },
  {
    name: 'login',
    placeholder: 'Enter your login',
    type: 'text',
    label: 'Login',
    path: 'user.data.login',
  },
  {
    name: 'first_name',
    placeholder: 'Enter your first name',
    type: 'text',
    label: 'First Name',
    path: 'user.data.first_name',
  },
  {
    name: 'second_name',
    placeholder: 'Enter your last name',
    type: 'text',
    label: 'Second Name',
    path: 'user.data.second_name',
  },
  {
    name: 'display_name',
    placeholder: 'Enter name to show',
    type: 'text',
    label: 'Name to show',
    path: 'user.data.display_name',
  },
  {
    name: 'phone',
    placeholder: 'Enter your phone',
    type: 'text',
    label: 'Phone',
    path: 'user.data.phone',
  },
];
