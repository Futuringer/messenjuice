import AvatarForm from '../../elements/avatarForm';
import store, { StoreEvents, withStore } from '../../utils/store';
import { User } from '../../api/authApi';
import { validateFormInput, setDefaultLabelState, handleInvalid, handleSubmitForm } from '../../utils/helpers';
import { profileInputsConfig, passwordsInputsConfig, infoInputsConfig } from '../../utils/consts';
import InputWithLabel from '../../elements/inputWithLabel';
import Form from '../../elements/form';
import Input from '../../elements/input';
import Button from '../../elements/button';
import profileTmp from './profileTmp';
import Block from '../../utils/block';
import {
  handleCancelClick,
  handleAvatarChange,
  handleProfileChangeSubmit,
  handlePasswordChangeSubmit,
  handleSignOutClick,
} from './profile';
import { eventBus } from '../../utils/eventBus';

export type ProfilePageProps = {
  data: User;
  name: string;
  img: string;
  form: typeof Form;
  profileFormIsActive?: boolean;
  passwordsFormIsActive?: boolean;
  changeInfoFormIsActive: boolean;
  avatarForm: AvatarForm;
};

const profileChangeInfoButton = new Button({
  variant: 'form',
  text: 'Change Info',
  type: 'submit',
  isActive: true,
  events: {
    click: () => eventBus.emit('setProfileForm', 'changeInfo'),
  },
});

const profileChangePasswordButton = new Button({
  variant: 'form',
  text: 'Change password',
  type: 'button',
  isActive: true,
  events: {
    click: () => eventBus.emit('setProfileForm', 'changePassword'),
  },
});

const profileCancelButton = new Button({
  variant: 'form',
  text: 'Cancel',
  type: 'button',
  isActive: true,
  events: {
    click: handleCancelClick,
  },
});

const profileSignOutButton = new Button({
  variant: 'form',
  text: 'Sign out',
  type: 'button',
  isActive: false,
  events: {
    click: handleSignOutClick,
  },
});

const profileInputs = profileInputsConfig.map(item => {
  return new InputWithLabel({
    label: item.label,
    input: new Input({
      ...item,
    }),
  });
});

const profileForm = new Form({
  formName: 'profileForm',
  formText: 'Profile',
  singleColumn: false,
  buttons: [profileChangeInfoButton, profileChangePasswordButton, profileCancelButton, profileSignOutButton],
  inputs: [...profileInputs],
});

const passwordsChangeInfoButton = new Button({
  variant: 'form',
  text: 'Change Info',
  type: 'submit',
  isActive: true,
});

const passwordsCancelButton = new Button({
  variant: 'form',
  text: 'Cancel',
  type: 'button',
  isActive: false,
  events: {
    click: () => eventBus.emit('setProfileForm', 'profile'),
  },
});

const passwordsInputs = passwordsInputsConfig.map(item => {
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

const passwordsForm = new Form({
  formName: 'passwordsForm',
  formText: 'Change password',
  singleColumn: false,
  buttons: [passwordsChangeInfoButton, passwordsCancelButton],
  inputs: [...passwordsInputs],
  events: {
    submit: (e: HTMLFormElement) => handlePasswordChangeSubmit(e, 'passwordsForm'),
  },
});

const infoChangeButton = new Button({
  variant: 'form',
  text: 'Change Info',
  type: 'submit',
  isActive: true,
});

const infoChangeCancelButton = new Button({
  variant: 'form',
  text: 'Cancel',
  type: 'button',
  isActive: false,
  events: {
    click: () => eventBus.emit('setProfileForm', 'profile'),
  },
});

const infoChangeInputs = infoInputsConfig.map(item => {
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

const infoChangeForm = new Form({
  formName: 'infoChangeForm',
  formText: 'Change user information',
  singleColumn: false,
  buttons: [infoChangeButton, infoChangeCancelButton],
  inputs: [...infoChangeInputs],
  events: {
    submit: (e: HTMLFormElement) => handleProfileChangeSubmit(e, 'infoChangeForm'),
  },
});

const avatarForm = new AvatarForm({
  events: {
    change: handleAvatarChange,
  },
});
class ProfilePageComponent extends Block {
  constructor(props: ProfilePageProps) {
    super({
      ...props,
      profileForm,
      passwordsForm,
      infoChangeForm,
      profileFormIsActive: true,
      passwordsFormIsActive: false,
      changeInfoFormIsActive: false,
      avatarForm,
    });
    eventBus.on('setProfileForm', (value: 'profile' | 'changeInfo' | 'changePassword') => {
      store.set('currentFormData.successText', '');
      this.props.profileFormIsActive = false;
      this.props.passwordsFormIsActive = false;
      this.props.changeInfoFormIsActive = false;

      switch (value) {
        case 'changeInfo':
          this.props.changeInfoFormIsActive = true;
          break;
        case 'changePassword':
          this.props.passwordsFormIsActive = true;
          break;
        default:
          this.props.profileFormIsActive = true;
      }

      store.set('currentFormData.errorText', '');
    });

    store.on(StoreEvents.Updated, () => {
      this.props.avatar = `https://ya-praktikum.tech/api/v2/resources/${this.props.data.avatar}`;
      (this.children.infoChangeForm as Block).props.errorText = store.getState().currentFormData.errorText;
      (this.children.passwordsForm as Block).props.errorText = store.getState().currentFormData.errorText;
      (this.children.infoChangeForm as Block).props.successText = store.getState().currentFormData.successText;
      (this.children.passwordsForm as Block).props.successText = store.getState().currentFormData.successText;
    });
  }

  init(): void {
    this.props.avatar = `https://ya-praktikum.tech/api/v2/resources/${this.props.data.avatar}`;
  }

  render() {
    const str = this.compile(profileTmp, this.props);
    return str;
  }
}

const withUser = withStore(state => ({ ...state.user }));

const ProfilewithUser = withUser(ProfilePageComponent);
export default ProfilewithUser;
