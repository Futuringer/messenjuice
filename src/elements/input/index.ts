import { InputsCollectionType } from 'src/utils/consts';
import Block from '../../utils/block';
import inputTmp from './inputTmp';

export type InputProps = {
  className?: string;
  name: InputsCollectionType;
  type: 'text' | 'number' | 'password' | 'email';
  isRequired?: boolean;
  placeholder: string;
  events?: {
    blur?: (value: Event) => void;
    focus?: (value: Event) => void;
    invalid?: (value: Event) => void;
    input?: (value: Event) => void;
  };
};

class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super(props);
  }

  render() {
    const str = this.compile(inputTmp, this.props);
    return str;
  }
}

export default Input;
