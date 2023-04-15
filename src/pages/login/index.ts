import store, { StoreEvents } from '../../utils/store';
import Link from '../../elements/link';
import { setDefaultLabelState, handleInvalid, validateFormInput } from '../../utils/helpers';
import { handleSignInSubmit } from './login';
import { loginInputsConfig } from '../../utils/consts';
import InputWithLabel from '../../elements/inputWithLabel';
import Form from '../../elements/form';
import Input from '../../elements/input';
import Button from '../../elements/button';
import loginTmp from './loginTmp';
import logo from '../../../static/imgs/logo.svg';
import Block from '../../utils/block';

type LoginPageProps = {
  img: string;
  form: typeof Form;
};

const inputsWithLlabel = loginInputsConfig.map(item => {
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

const signInButton = new Button({
  variant: 'form',
  text: 'Sign in',
  type: 'submit',
  isActive: true,
});

const createAccountLink = new Link({
  descriptionLinkText: 'Create one',
  descriptionLink: '/sign-up',
  linkClass: 'form__description-link',
});

const loginForm = new Form({
  formName: 'loginForm',
  formText: 'Sign in',
  descriptionText: 'No account?',
  descriptionLink: createAccountLink,
  singleColumn: true,
  buttons: [signInButton],
  inputs: [...inputsWithLlabel],
  events: {
    submit: (e: HTMLFormElement) => handleSignInSubmit(e, 'loginForm'),
  },
});

class LoginPageComponent extends Block {
  constructor(props?: LoginPageProps) {
    super({ img: logo, form: loginForm, ...props });

    store.on(StoreEvents.Updated, () => {
      (this.children.form as Block).props.errorText = store.getState().loginFormData.errorText;
    });
  }

  render() {
    const str = this.compile(loginTmp, this.props);
    return str;
  }
}

export default LoginPageComponent;
