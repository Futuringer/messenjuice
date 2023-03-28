import {
  validateFormInput,
  setDefaultLabelState,
  handleInvalid,
  handleSubmitForm,
  validateFormInput2,
} from '../../utils/helpers';
import { validationFormsConfig, loginInputsConfig } from '../../utils/consts';
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

const inputsWithLlabel = loginInputsConfig.map(item => {
  // eslint-disable-next-line no-new
  return new InputWithLabel({
    label: item.label,
    input: new Input({
      ...item,
      events: {
        blur: () => validateFormInput2(item.name),
        focus: () => setDefaultLabelState(item.name),
        invalid: () => handleInvalid(item.name),
      },
    }),
  });
});

const signInButton = new Button({
  variant: 'form',
  text: 'Sign in',
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
  buttons: [signInButton],
  inputs: [...inputsWithLlabel],
  events: {
    submit: e => handleSubmitForm(e, 'loginForm'),
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
