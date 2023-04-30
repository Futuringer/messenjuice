import Block from '../../utils/block';
import Button from '../../elements/button';
import serverErrorTmp from './serverErrorTmp';
import ErrorBlock from '../../elements/errorBlock';
import { ROUTES } from '../../utils/consts';
import { router } from '../../utils/router';

type ClientErrorPageProps = {
  errorBlock: ErrorBlock;
};

const backToChatButton = new Button({
  variant: 'form',
  text: 'Go to main',
  type: 'button',
  isActive: true,
  events: {
    click: () => {
      router.go(ROUTES.LOGIN);
    },
  },
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
