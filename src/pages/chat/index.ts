import { validateInput } from '../../utils/helpers';
import Message from '../../elements/message';
import Button from '../../elements/button';
import Input from '../../elements/input';
import ContactCard from '../../elements/contactCard';
import chatTmp from './chatTmp';
import Block from '../../utils/block';
import CardsBlock from '../../elements/cardsBlock';
import UserBadge from '../../elements/userBadge';
import arrow from '../../../static/imgs/icons/arrow.svg';
import dots from '../../../static/imgs/icons/dots.svg';
import MessageForm from '../../elements/messageForm';
import { handleSettingsButtonClick, handleSendMessage } from './chat';
import store, { StoreEvents, withStore } from '../../utils/store';
import ChatUserstWithState from '../../elements/chatUsers';

type ChatProps = {
  optionsButton: Button;
  settingsButton: Button;
  userBadge: UserBadge;
  searchInput: typeof Input;
  contacts: CardsBlock;
  messageForm: MessageForm;
  messages: Message[];
};
const cardsBlock = new CardsBlock({});

const chatUsers = new ChatUserstWithState({});
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

const settingsButton = new Button({
  variant: 'circle',
  icon: dots,
  type: 'submit',
  className: 'chat__submitButton',
  events: {
    click: handleSettingsButtonClick,
  },
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
      handleSendMessage(input.value);
      input.value = '';
      messageSubmitButton.setProps({
        disabled: true,
      });
    },
  },
});

class ChatPageComponent extends Block {
  constructor(props: ChatProps) {
    super({
      ...props,
      optionsButton: messageOptionsButton,
      chatUsers,
      searchInput,
      contacts: cardsBlock,
      messageForm,
      messages: [],
      settingsButton,
    });
    store.on(StoreEvents.Updated, () => {
      this.props.showInput = Boolean(store.getState().currentChat?.value);

      const { currentChat } = store.getState();
      const currentMessages = store.getState().chats?.cards.find(item => {
        return item.id === currentChat?.value;
      })?.messages;

      const currentMessagesComps = currentMessages?.map(item => {
        return new Message(item);
      });

      if (currentMessagesComps) {
        this.props.messages = currentMessagesComps;
        this.children.messages = currentMessagesComps;
      } else {
        this.props.messages = [];
        this.children.messages = [];
      }

      if (store.getState().chats?.cards) {
        (this.children.contacts as Block).children.cards = store.getState().chats?.cards.map(item => {
          return new ContactCard(item);
        }) as ContactCard[];
        (this.children.contacts as Block).props.cards = store.getState().chats?.cards.map(item => {
          return new ContactCard(item);
        });
      }
    });
  }

  render() {
    const str = this.compile(chatTmp, this.props);
    return str;
  }
}

const withChats = withStore(state => ({ ...state.currentChat, ...state.chats?.cards }));

const ChatPageWithState = withChats(ChatPageComponent);
export default ChatPageWithState;
