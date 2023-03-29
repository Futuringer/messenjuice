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

class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super(props);
  }

  render() {
    const str = this.compile(messengeTmp, this.props);

    return str;
  }
}

export default Message;
