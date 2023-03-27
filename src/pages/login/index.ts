import { validateFormInput, setDefaultLabelState, handleInvalid, gatherAllInputs } from '../../utils/helpers';
import { validationConfig } from '../../utils/consts';
import InputWithLabel from '../../elements/inputWithLabel';
import Form from '../../elements/form';
import Input from '../../elements/input';
import Button from '../../elements/button';
import loginTmp from './loginTmp';
import logo from '../../../static/imgs/logo.svg';
import Block from '../../utils/block';

type LoginPageProps = {
  img: string;
  form: Form;
};

const loginInput = new Input({
  name: 'Login',
  placeholder: 'Enter your login',
  type: 'text',
  isRequired: false,
  events: {
    blur: () => validateFormInput(validationConfig.Login),
    focus: () => setDefaultLabelState('Login'),
    invalid: () => handleInvalid('Login'),
  },
});

const loginInputWithLabel = new InputWithLabel({
  label: 'login',
  input: loginInput,
});

const passwordInput = new Input({
  name: 'Password',
  placeholder: 'Enter your password',
  type: 'password',
  isRequired: false,
  events: {
    blur: () => validateFormInput(validationConfig.Password),
    focus: () => setDefaultLabelState('Password'),
    invalid: () => handleInvalid('Password'),
  },
});

const passwordInputWithLabel = new InputWithLabel({
  label: 'password',
  input: passwordInput,
});

const signUpButton = new Button({
  text: 'Sign up',
  type: 'submit',
  isActive: true,
});

const loginForm = new Form({
  formName: 'loginForm',
  formText: 'Sign in',
  descriptionText: 'No account?',
  descriptionLinkText: 'Create one',
  descriptionLink: './sign-up',
  singleColumn: true,
  buttons: [signUpButton],
  inputs: [loginInputWithLabel, passwordInputWithLabel],
  events: {
    submit: e => {
      e.preventDefault();
      const form = document.forms.namedItem('loginForm');
      const inputs = gatherAllInputs(form!);
      inputs.forEach(input => validateFormInput(validationConfig[input as keyof typeof validationConfig]));

      const data = new FormData(form!);
      // eslint-disable-next-line no-restricted-syntax
      for (const [name, value] of data) {
        console.log(name, ':', value);
      }
    },
  },
});

class LoginPageComponent extends Block<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const str = this.compile(loginTmp, this.props);
    return str;
  }
}

const LoginPage = new LoginPageComponent({
  img: logo,
  form: loginForm,
});

export default LoginPage;
