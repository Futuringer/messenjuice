import { validateFormInput, setDefaultLabelState, handleInvalid, gatherAllInputs } from '../../utils/helpers';
import { validationFormsConfig } from '../../utils/consts';
import InputWithLabel from '../../elements/inputWithLabel';
import Form from '../../elements/form';
import Input from '../../elements/input';
import Button from '../../elements/button';
import loginTmp from './loginTmp';
import logo from '../../../static/imgs/logo.svg';
import Block from '../../utils/block';
import inputsConfig from './utils';

type LoginPageProps = {
  img: string;
  form: Form;
};

const inputsWithLlabel = inputsConfig.map(item => {
  // eslint-disable-next-line no-new
  return new InputWithLabel({
    label: item.name,
    input: new Input({
      ...item,
      events: {
        blur: () => validateFormInput(validationFormsConfig[item.name as keyof typeof validationFormsConfig]),
        focus: () => setDefaultLabelState(item.name),
        invalid: () => handleInvalid(item.name),
      },
    }),
  });
});

const signUpButton = new Button({
  variant: 'form',
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
  inputs: [...inputsWithLlabel],
  events: {
    submit: e => {
      e.preventDefault();
      const form = document.forms.namedItem('loginForm');
      const inputs = gatherAllInputs(form!);
      const results = inputs.map(input =>
        validateFormInput(validationFormsConfig[input as keyof typeof validationFormsConfig]),
      );
      const noErrors = results.every(item => item);

      if (noErrors) {
        const data = new FormData(form!);
        // eslint-disable-next-line no-restricted-syntax
        for (const [name, value] of data) {
          console.log(name, ':', value);
        }
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
