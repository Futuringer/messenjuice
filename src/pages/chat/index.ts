import { validateInput } from '../../utils/helpers';
import Message from '../../elements/message';
import Button from '../../elements/button';
import Input from '../../elements/input';
import ContactCard from '../../elements/contactCard';
import chatTmp from './chatTmp';
import Block from '../../utils/block';
import CardsBlock from '../../elements/cardsBlock';
import { mockCards, mockMessages } from './utils';
import UserBadge from '../../elements/userBadge';
import logo from '../../../static/imgs/avatarPlaceholder.png';
import arrow from '../../../static/imgs/icons/arrow.svg';
import dots from '../../../static/imgs/icons/dots.svg';
import MessageForm from '../../elements/messageForm';

type ChatProps = {
  optionsButton: Button;
  userBadge: UserBadge;
  searchInput: Input;
  contacts: CardsBlock;
  messageForm: MessageForm;
  messages: Message[];
};

const cards = mockCards.map(item => {
  return new ContactCard(item);
});

const messages = mockMessages.map(item => {
  return new Message(item);
});

const cardsBlock = new CardsBlock({
  cards,
});

const userBadge = new UserBadge({
  avatar: logo,
  name: 'Vlad',
});

const searchInput = new Input({
  name: 'search',
  placeholder: 'search...',
  type: 'text',
  className: 'chatInput',
});

const messageSubmitButton = new Button({
  variant: 'circle',
  icon: arrow,
  type: 'submit',
  className: 'chat__submitButton',
  disabled: true,
});

const messageOptionsButton = new Button({
  variant: 'circle',
  icon: dots,
  type: 'button',
  className: 'chat__optionsButton',
});

const messageInput = new Input({
  name: 'message',
  placeholder: 'Message',
  type: 'text',
  className: 'messageInput',
  events: {
    input: () => {
      const isValid = validateInput('message').result;
      messageSubmitButton.setProps({
        disabled: !isValid,
      });
    },
  },
});

const messageForm = new MessageForm({
  button: messageSubmitButton,
  input: messageInput,
  events: {
    submit: e => {
      e.preventDefault();
      const input = document.getElementsByName('message')[0] as HTMLInputElement;
      console.log(input.value);
    },
  },
});

class ChatPageComponent extends Block {
  constructor(props?: ChatProps) {
    super({
      optionsButton: messageOptionsButton,
      userBadge,
      searchInput,
      contacts: cardsBlock,
      messageForm,
      messages,
      ...props,
    });
  }

  render() {
    const str = this.compile(chatTmp, this.props);
    return str;
  }
}

export default ChatPageComponent;
