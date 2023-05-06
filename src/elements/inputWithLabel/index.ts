import Block from '../../utils/block';
import inputWithLabelTmp from './inputWithLabelTmp';

export type InputWithLabelProps = {
  label: string;
  input: any;
};

class InputWithLabel extends Block {
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
    if (name) {
      label?.setAttribute('for', name);
    }
    if (label) {
      label.dataset.default = this.props.label;
    }
  }
}

export default InputWithLabel;
