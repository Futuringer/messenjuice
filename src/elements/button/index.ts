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
    click: (e: Event) => void;
  };
  className?: string;
  disabled?: boolean;
};

type ButtonProps = DefaultButtonProps | CircleButtonProps;
class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    const str = this.compile(buttonTmp, this.props);
    return str;
  }
}

export default Button;
