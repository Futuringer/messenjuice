import Block from '../../utils/block';
import buttonTmp from './buttonTmp';

export type ButtonProps = {
  text: string;
  type: 'submit' | 'button';
  isActive?: boolean;
  events?: any;
};

// const button = () => {
//   return compile(buttonTmp)({});
// };

// eslint-disable-next-line import/prefer-default-export
class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const str = this.compile(buttonTmp, this.props);
    // return document.createRange().createContextualFragment(str);
    return str;
  }
}

export default Button;
