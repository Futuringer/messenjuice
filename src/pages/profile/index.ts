import authController from '../../controllers/authController';
import { withStore } from '../../utils/store';
import { validateFormInput, setDefaultLabelState, handleInvalid, handleSubmitForm } from '../../utils/helpers';
import { profileInputsConfig } from '../../utils/consts';
import InputWithLabel from '../../elements/inputWithLabel';
import Form from '../../elements/form';
import Input from '../../elements/input';
import Button from '../../elements/button';
import profileTmp from './profileTmp';
import logo from '../../../static/imgs/avatarPlaceholder.png';
import Block from '../../utils/block';

export type ProfilePageProps = {
  name: string;
  img: string;
  form: typeof Form;
};

const changeInfoButton = new Button({
  variant: 'form',
  text: 'Change Info',
  type: 'submit',
  isActive: true,
});

const cancelButton = new Button({
  variant: 'form',
  text: 'Cancel',
  type: 'button',
  isActive: false,
});

const inputsWithLlabel = profileInputsConfig.map(item => {
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

const profileForm = new Form({
  formName: 'profileForm',
  formText: 'Profile',
  singleColumn: false,
  buttons: [changeInfoButton, cancelButton],
  inputs: [...inputsWithLlabel],
  events: {
    submit: (e: HTMLFormElement) => {
      handleSubmitForm(e, 'profileForm', () => console.log(12));
    },
  },
});
class ProfilePageComponent extends Block {
  constructor(props: ProfilePageProps) {
    super({ ...props, name: 'Vlad', img: logo, form: profileForm });
  }

  init(): void {
    // authController.fetchUser();
    // console.log('this.props', this.props);
  }

  render() {
    const str = this.compile(profileTmp, this.props);
    return str;
  }
}

const withUser = withStore(state => ({ ...state.user }));

const ProfilewithUser = withUser(ProfilePageComponent);
export default ProfilewithUser;
