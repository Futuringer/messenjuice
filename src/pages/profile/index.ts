import { validateFormInput, setDefaultLabelState, handleInvalid, handleSubmitForm } from '../../utils/helpers';
import { validationFormsConfig, profileInputsConfig } from '../../utils/consts';
import InputWithLabel from '../../elements/inputWithLabel';
import Form from '../../elements/form';
import Input from '../../elements/input';
import Button from '../../elements/button';
import profileTmp from './profileTmp';
import logo from '../../../static/imgs/avatarPlaceholder.png';
import Block from '../../utils/block';

type ProfilePageProps = {
  name: string;
  img: string;
  form: Form;
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
  // eslint-disable-next-line no-new
  return new InputWithLabel({
    label: item.label,
    input: new Input({
      ...item,
      events: {
        blur: () => validateFormInput(validationFormsConfig[item.name as keyof typeof validationFormsConfig]!),
        focus: () => setDefaultLabelState(item.name),
        invalid: () => handleInvalid(item.name),
      },
    }),
  });
});

const profileForm2 = new Form({
  formName: 'profileForm2',
  formText: 'Profile',
  singleColumn: false,
  buttons: [changeInfoButton, cancelButton],
  inputs: [...inputsWithLlabel],
  events: {
    submit: e => {
      handleSubmitForm(e, 'profileForm2');
    },
  },
});
class ProfilePageComponent extends Block<ProfilePageProps> {
  constructor(props: ProfilePageProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const str = this.compile(profileTmp, this.props);
    return str;
  }
}

const ProfilePage = new ProfilePageComponent({
  name: 'Vlad',
  img: logo,
  form: profileForm2,
});

export default ProfilePage;
