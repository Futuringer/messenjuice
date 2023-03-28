import Block from '../../utils/block';
import inputTmp from './inputTmp';

export type InputProps = {
  className?: string;
  name: string;
  type: 'text' | 'number' | 'password' | 'email';
  isRequired?: boolean;
  placeholder: string;
  events?: {
    blur?: (value: HTMLInputElement) => void;
    focus?: (value: HTMLInputElement) => void;
    invalid?: (value: HTMLInputElement) => void;
    input?: (value: Event) => void;
  };
};

class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const str = this.compile(inputTmp, this.props);
    return str;
  }
}

export default Input;
