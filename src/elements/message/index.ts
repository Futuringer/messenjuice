import Block from '../../utils/block';
import messengeTmp from './messageTmp';

type ImageMessageProps = {
  image: string;
  time: string;
  isOwn: boolean;
};

type TextMessageprops = {
  content: string;
  time: string;
  isOwn: boolean;
};

export type MessageProps = ImageMessageProps | TextMessageprops;

class Message extends Block {
  constructor(props: MessageProps) {
    super(props);
  }

  render() {
    const str = this.compile(messengeTmp, this.props);

    return str;
  }
}

export default Message;
