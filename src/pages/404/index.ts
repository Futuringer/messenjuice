import Block from '../../utils/block';
import Button from '../../elements/button';
import clientErrorTmp from './clientErrorTmp';
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
  errorText: 'Page not found',
  errorTitle: '404',
});
class ClientErrorPageComponent extends Block {
  constructor(props?: ClientErrorPageProps) {
    super({ errorBlock, ...props });
  }

  render() {
    const str = this.compile(clientErrorTmp, this.props);
    return str;
  }
}

export default ClientErrorPageComponent;
