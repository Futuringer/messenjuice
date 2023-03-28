import { InputProps } from 'src/elements/input';

const inputsConfig: InputProps[] = [
  {
    name: 'Login',
    placeholder: 'Enter your login',
    type: 'text',
    isRequired: false,
  },
  {
    name: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    isRequired: false,
  },
];

export default inputsConfig;
