import chatTmp from './chatTmp';
import Block from '../../utils/block';
import Button from '../../elements/button';

type ChatProps = {
  contacts: Button;
};

// const data = {
//   formName: 'registrationForm',
//   formText: 'Sign up',
//   descriptionText: 'Already have an account?',
//   descriptionLinkText: 'Log in',
//   descriptionLink: '/sign-in',
//   singleColumn: true,
//   img: logo,
//   inputs: [
//     { label: 'Login', name: 'login', type: 'text', placeholder: 'Enter your login', isRequired: true },
//     { label: 'First Name', name: 'first_name', type: 'text', placeholder: 'Enter your First Name', isRequired: true },
//     {
//       label: 'Second Name',
//       name: 'second_name',
//       type: 'text',
//       placeholder: 'Enter your Second Name',
//       isRequired: true,
//     },
//     { label: 'Email Address', name: 'email', type: 'texy', placeholder: 'Enter your Email', isRequired: true },
//     { label: 'Phone', name: 'phone', type: 'phone', placeholder: 'Enter your Phone', isRequired: true },
//     { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter your Password', isRequired: true },
//   ],
//   buttons: [
//     { type: 'button', text: 'Change Info', isActive: false },
//     { type: 'button', text: 'Change Password', isActive: false },
//     { type: 'submit', text: 'Cancel', isActive: true },
//   ],
// };

// const contacats = new ContactsBlock({
//   text: 'ContactsBlock',
// });
const signUpButton = new Button({
  text: 'Sign up',
  type: 'submit',
  isActive: true,
});

class ChatPageComponent extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const str = this.compile(chatTmp, this.props);
    return str;
  }
}

const ChatPage = new ChatPageComponent({
  contacts: signUpButton,
});

export default ChatPage;
