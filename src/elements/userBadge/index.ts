import Block from '../../utils/block';
import userBadgeTmp from './userBadgeTmp';

type UserBadgeProps = {
  avatar: string;
  name: string;
};

class UserBadge extends Block<UserBadgeProps> {
  constructor(props: UserBadgeProps) {
    super(props);
  }

  render() {
    const str = this.compile(userBadgeTmp, this.props);
    return str;
  }
}

export default UserBadge;
