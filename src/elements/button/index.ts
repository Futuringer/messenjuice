import Block from '../../utils/block';
import buttonTmp from './buttonTmp';

type DefaultButtonProps = {
  variant: 'form';
  type: 'submit' | 'button';
  text: string;
  isActive?: boolean;
  events?: {
    click: () => void;
  };
  className?: string;
  disabled?: boolean;
};

type CircleButtonProps = {
  variant: 'circle';
  type: 'submit' | 'button';
  icon: string;
  events?: {
    click: () => void;
  };
  className?: string;
  disabled?: boolean;
};

type ButtonProps = DefaultButtonProps | CircleButtonProps;

// eslint-disable-next-line import/prefer-default-export
class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const str = this.compile(buttonTmp, this.props);
    return str;
  }
}

export default Button;
