import { validateFormInput, setDefaultLabelState, handleInvalid, handleSubmitForm } from '../../utils/helpers';
import { registrationInputsConfig } from '../../utils/consts';
import InputWithLabel from '../../elements/inputWithLabel';
import Form from '../../elements/form';
import Input from '../../elements/input';
import Button from '../../elements/button';
import registrationTmp from './registrationTmp';
import logo from '../../../static/imgs/logo.svg';
import Block from '../../utils/block';

type RegistrationPageProps = {
  img: string;
  form: Form;
};

const inputsWithLlabel = registrationInputsConfig.map(item => {
  return new InputWithLabel({
    label: item.label,
    input: new Input({
      ...item,
      events: {
        blur: () => validateFormInput(item.name),
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

const registrationForm = new Form({
  formName: 'loginForm',
  formText: 'Sign in',
  descriptionText: 'Already have an account?',
  descriptionLinkText: 'Log in',
  descriptionLink: './sign-in',
  singleColumn: true,
  buttons: [signUpButton],
  inputs: [...inputsWithLlabel],
  events: {
    submit: e => handleSubmitForm(e, 'loginForm'),
  },
});

class RegistrationPageComponent extends Block<RegistrationPageProps> {
  constructor(props: RegistrationPageProps) {
    super(props);
  }

  render() {
    const str = this.compile(registrationTmp, this.props);
    return str;
  }
}

const RegistrationPage = new RegistrationPageComponent({
  img: logo,
  form: registrationForm,
});

export default RegistrationPage;
