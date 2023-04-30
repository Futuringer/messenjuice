import { ChatType } from '../../api/chatsApi';
import Block from '../../utils/block';
import contactCardTmp from './contactCardTmp';
import logo from '../../../static/imgs/avatarPlaceholder.png';
import cross from '../../../static/imgs/icons/cross.svg';
import Button from '../button';
import { handleDeleteChat, handleCardChange } from './contactCard';

export type ContactCardProps = ChatType & {
  newChatButton?: Button;
  className?: string;
};

class ContactCard extends Block {
  constructor(props: ContactCardProps) {
    super({
      ...props,
      events: {
        click: () => {
          handleCardChange(props.id);
        },
      },
      deleteChatButton: new Button({
        className: 'card__deleteCard',
        type: 'button',
        variant: 'circle',
        icon: cross,
        events: {
          click: e => handleDeleteChat(e, props.id),
        },
      }),
      avatar: props.avatar ? `https://ya-praktikum.tech/api/v2/resources/${props.avatar}` : logo,
    });
  }

  render() {
    const str = this.compile(contactCardTmp, this.props);
    return str;
  }
}

export default ContactCard;
