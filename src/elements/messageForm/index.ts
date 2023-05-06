import Block from '../../utils/block';
import messageFormTmp from './messageFormTmp';
import Button from '../button';

type MessageFormProps = {
  button: Button;
  input: any;
  events: {
    submit?: (value: HTMLFormElement) => void;
  };
};

class MessageForm extends Block {
  constructor(props: MessageFormProps) {
    super(props);
  }

  render() {
    const str = this.compile(messageFormTmp, this.props);
    return str;
  }
}

export default MessageForm;
