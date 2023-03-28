import Block from '../../utils/block';
import inputWithLabelTmp from './inputWithLabelTmp';
import Input from '../input';
// const input = () => {
//   return compile(inputTmp)({});
// };

export type InputWithLabelProps = {
  label: string;
  input: Input;
};

class InputWithLabel extends Block<InputWithLabelProps> {
  constructor(props: InputWithLabelProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const str = this.compile(inputWithLabelTmp, this.props);
    return str;
  }

  // eslint-disable-next-line class-methods-use-this
  init() {
    const name = this.element?.getElementsByTagName('input')[0].getAttribute('name');
    const label = this.element?.getElementsByTagName('label')[0];
    label?.setAttribute('for', name!);
    // label?.setAttribute('defaultText', this.props.label!);
    if (label) {
      label.dataset.default = this.props.label!;
    }
  }
}

export default InputWithLabel;
