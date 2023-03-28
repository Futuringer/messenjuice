import Block from '../../utils/block';
import messengeTmp from './messageTmp';

type ImageMessageProps = {
  image: string;
  time: string;
  isMyMessage: boolean;
};

type TextMessageprops = {
  text: string;
  time: string;
  isMyMessage: boolean;
};

export type MessageProps = ImageMessageProps | TextMessageprops;

// eslint-disable-next-line import/prefer-default-export
class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const str = this.compile(messengeTmp, this.props);

    return str;
  }
}

export default Message;
