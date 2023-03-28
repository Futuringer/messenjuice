import Block from '../../utils/block';
import contactCardTmp from './contactCardTmp';

export type ContactCardProps = {
  message: string;
  avatar: string;
  name: string;
  time: string;
  messagesCount: number;
};

// const button = () => {
//   return compile(buttonTmp)({});
// };

// eslint-disable-next-line import/prefer-default-export
class ContactCard extends Block<ContactCardProps> {
  constructor(props: ContactCardProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const str = this.compile(contactCardTmp, this.props);
    // return document.createRange().createContextualFragment(str);
    return str;
  }
}

export default ContactCard;
