import Block from '../../utils/block';
import chatUsersTmp from './chatUsersTmp';
import UserBadge from '../userBadge';
import store, { ChatUserType, StoreEvents, withStore } from '../../utils/store';
import Button from '../button';
import cross from '../../../static/imgs/icons/cross.svg';
import { handleAddChatClick } from './chatUsers';

type UserBadgeProps = {
  users: ChatUserType;
};

class ChatUsers extends Block {
  constructor(props: UserBadgeProps) {
    super({
      ...props,
      addUserButton: new Button({
        className: 'chatUsers__button',
        type: 'button',
        variant: 'circle',
        icon: cross,
        events: {
          click: handleAddChatClick,
        },
      }),
    });

    store.on(StoreEvents.Updated, () => {
      this.props.showAddButton = Boolean(store.getState().currentChat?.value);
    });
  }

  render() {
    if (this.props.users) {
      this.children.renderUsers = this.props.users.map((item: ChatUserType) => {
        return new UserBadge(item);
      });
    }
    const str = this.compile(chatUsersTmp, this.props);
    return str;
  }
}

const withChats = withStore(state => ({ ...state.currentChat }));

const ChatUserstWithState = withChats(ChatUsers);
export default ChatUserstWithState;
