import { validateFormInput, setDefaultLabelState, handleInvalid, handleSubmitForm } from '../../utils/helpers';
import { registrationInputsConfig } from '../../utils/consts';
import InputWithLabel from '../../elements/inputWithLabel';
import Form from '../../elements/form';
import Input from '../../elements/input';
import Button from '../../elements/button';
import registrationTmp from './registrationTmp';
import logo from '../../../static/imgs/logo.svg';
import Block from '../../utils/block';
import Link from '../../elements/link';
import { handleSignUpSubmit } from './registration';
import store, { StoreEvents } from '../../utils/store';

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

const loginLink = new Link({
  descriptionLinkText: 'Log in',
  descriptionLink: '/',
  linkClass: 'form__description-link',
});

const registrationForm = new Form({
  formName: 'registrationForm',
  formText: 'Sign up',
  descriptionText: 'Already have an account?',
  descriptionLink: loginLink,
  singleColumn: true,
  buttons: [signUpButton],
  inputs: [...inputsWithLlabel],
  events: {
    submit: e => handleSignUpSubmit(e, 'registrationForm'),
  },
});

class RegistrationPageComponent extends Block {
  constructor(props?: RegistrationPageProps) {
    super({ img: logo, form: registrationForm, ...props });

    store.on(StoreEvents.Updated, () => {
      (this.children.form as Block).props.errorText = store.getState().registrationFormData.errorText;
    });
  }

  render() {
    const str = this.compile(registrationTmp, this.props);
    return str;
  }
}

export default RegistrationPageComponent;
