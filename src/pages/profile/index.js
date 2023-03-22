import Handlebars from 'handlebars';
import profileTmp from './profileTmp';
import logo from '../../../static/imgs/avatarPlaceholder.png';

const data = {
  formName: 'profileForm',
  formText: 'Profile',
  singleColumn: false,
  img: logo,
  inputs: [
    { label: 'Email Address', name: 'email', type: 'text', placeholder: 'Enter your Email', isRequired: true },
    { label: 'Login', name: 'login', type: 'text', placeholder: 'Enter your login', isRequired: true },
    { label: 'First Name', name: 'first_name', type: 'text', placeholder: 'Enter your First Name', isRequired: true },
    {
      label: 'Second Name',
      name: 'second_name',
      type: 'text',
      placeholder: 'Enter your Second Name',
      isRequired: true,
    },
    { label: 'Name to show', name: 'display_name', type: 'text', placeholder: 'Enter your Phone', isRequired: true },
    { label: 'Phone', name: 'phone', type: 'tel', placeholder: 'Enter your Phone', isRequired: true },
  ],
  buttons: [
    { type: 'button', text: 'Change Info', isActive: false },
    { type: 'button', text: 'Change Password', isActive: false },
    { type: 'submit', text: 'Cancel', isActive: true },
  ],
};

const renderProfile = () => {
  return Handlebars.compile(profileTmp)(data);
};

export default renderProfile;
