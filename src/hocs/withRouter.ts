import Block from '../utils/block';
import { Router, router } from '../utils/router';

export const withRouter = (Component: typeof Block) => {
  // TODO разобраться тут с типом
  type Props = any;

  return class WithRouter extends Component {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router });
    }
  };
};

export interface PropsWithRouter {
  router: typeof Router;
}
