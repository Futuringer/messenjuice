import { InputsCollectionType } from 'src/utils/consts';
import Block from '../../utils/block';
import inputTmp from './inputTmp';
import { withStore } from '../../utils/store';
import { getFromObj } from '../../utils/helpers';

export type InputProps = {
  path?: string;
  value?: string;
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

class Input extends Block {
  constructor(props: InputProps) {
    super(props);
  }

  render() {
    if (this?.props?.path?.length > 0) {
      this.props.value = getFromObj(this.props, this.props.path);
    }
    const str = this.compile(inputTmp, this.props);
    return str;
  }
}

const withInput = withStore(state => ({ ...state }));

const InputWithState = withInput(Input);
export default InputWithState;
