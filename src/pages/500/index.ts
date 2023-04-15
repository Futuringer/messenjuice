import Block from '../../utils/block';
import Button from '../../elements/button';
import serverErrorTmp from './serverErrorTmp';
import ErrorBlock from '../../elements/errorBlock';

type ClientErrorPageProps = {
  errorBlock: ErrorBlock;
};

const backToChatButton = new Button({
  variant: 'form',
  text: 'Back to chat',
  type: 'button',
  isActive: true,
});

const errorBlock = new ErrorBlock({
  button: backToChatButton,
  errorText: 'Server error',
  errorTitle: '500',
});
class ServerErrorPageComponent extends Block {
  constructor(props?: ClientErrorPageProps) {
    super({ errorBlock, ...props });
  }

  render() {
    const str = this.compile(serverErrorTmp, this.props);
    return str;
  }
}

export default ServerErrorPageComponent;
