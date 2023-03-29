import Block from '../../utils/block';
import Button from '../button';
import errorBlockTmp from './errorBlockTmp';

type ErrorBlockProps = {
  errorTitle: string;
  errorText: string;
  button: Button;
};

class ErrorBlock extends Block<ErrorBlockProps> {
  constructor(props: ErrorBlockProps) {
    super(props);
  }

  render() {
    const str = this.compile(errorBlockTmp, this.props);
    return str;
  }
}

export default ErrorBlock;
