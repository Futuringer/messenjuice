import Block from '../../utils/block';
import userBadgeTmp from './userBadgeTmp';
import { ChatUserType } from '../../utils/store';
import Button from '../button';
import cross from '../../../static/imgs/icons/cross.svg';
import { handleDeleteUserFromChat } from './userBadge';

type UserBadgeProps = ChatUserType;

class UserBadge extends Block {
  constructor(props: UserBadgeProps) {
    super({
      ...props,
      deleteButton: new Button({
        className: 'userBadge__deleteUser',
        type: 'button',
        variant: 'circle',
        icon: cross,
        events: {
          click: () => {
            handleDeleteUserFromChat(props.id);
          },
        },
      }),
    });
  }

  render() {
    const str = this.compile(userBadgeTmp, this.props);
    return str;
  }
}

export default UserBadge;
