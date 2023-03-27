import Block from '../../utils/block';
import inputTmp from './inputTmp';

// const input = () => {
//   return compile(inputTmp)({});
// };

export type InputProps = {
  name: string;
  type: 'text' | 'number' | 'password' | 'email';
  isRequired?: boolean;
  placeholder: string;
  events?: {
    blur?: (value: HTMLInputElement) => void;
    focus?: (value: HTMLInputElement) => void;
    invalid?: (value: HTMLInputElement) => void;
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
