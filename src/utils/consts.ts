import { InputProps } from 'src/elements/input';
import { InputWithLabelProps } from 'src/elements/inputWithLabel';

export const validationParams = {
  login: [
    { regex: /^[a-zA-Z0-9_-]*$/, message: 'Invalid characters' },
    { regex: /[a-zA-Z]+$/, message: 'Field must contain at least one letter' },
    { regex: /^.{3,20}$/, message: 'Field must contain from 3 to 20 characters' },
  ],
  password: [
    { regex: /^.{8,40}$/, message: 'Field must contain from 8 to 40 characters' },
    { regex: /[A-Z]/, message: 'Field must contain at least one capital letter' },
    { regex: /[0-9]/, message: 'Field must contain at least one digit' },
  ],
  old_password: [
    { regex: /^.{8,40}$/, message: 'Field must contain from 8 to 40 characters' },
    { regex: /[A-Z]/, message: 'Field must contain at least one capital letter' },
    { regex: /[0-9]/, message: 'Field must contain at least one digit' },
  ],
  new_password: [
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
};

export type InputsCollectionType = keyof typeof validationParams;

type InputFormsConfigType = Array<
  Omit<InputProps, 'name'> & Pick<InputWithLabelProps, 'label'> & { name: keyof typeof validationParams }
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
