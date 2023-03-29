import Block from '../../utils/block';
import contactCardTmp from './contactCardTmp';

export type ContactCardProps = {
  message: string;
  avatar: string;
  name: string;
  time: string;
  messagesCount: number;
};

class ContactCard extends Block<ContactCardProps> {
  constructor(props: ContactCardProps) {
    super(props);
  }

  render() {
    const str = this.compile(contactCardTmp, this.props);

    return str;
  }
}

export default ContactCard;
