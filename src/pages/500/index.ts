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
class ServerErrorPageComponent extends Block<ClientErrorPageProps> {
  constructor(props: ClientErrorPageProps) {
    super(props);
  }

  render() {
    const str = this.compile(serverErrorTmp, this.props);
    return str;
  }
}

const ServerErrorPage = new ServerErrorPageComponent({
  errorBlock,
});

export default ServerErrorPage;
