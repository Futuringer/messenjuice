import Block from '../../utils/block';
import messageFormTmp from './messageFormTmp';
import Button from '../button';
import Input from '../input';

type MessageFormProps = {
  button: Button;
  input: Input;
  events: {
    submit?: (value: HTMLFormElement) => void;
  };
};

class MessageForm extends Block<MessageFormProps> {
  constructor(props: MessageFormProps) {
    super(props);
  }

  render() {
    const str = this.compile(messageFormTmp, this.props);
    return str;
  }
}

export default MessageForm;
