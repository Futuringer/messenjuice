import { PropsWithRouter, withRouter } from '../../hocs/withRouter';
import Block from '../../utils/block';
import linkTmp from './linkTmp';

export type BaseLinkProps = PropsWithRouter & {
  descriptionLinkText: string;
  descriptionLink: string;
  linkClass?: string;
};

export class BaseLink extends Block {
  constructor(props: BaseLinkProps) {
    super({
      ...props,
      events: {
        click: () => {
          this.navigate();
        },
      },
    });
  }

  navigate() {
    this.props.router.go(this.props.descriptionLink);
  }

  render() {
    const str = this.compile(linkTmp, this.props);
    return str;
  }
}

const Link = withRouter(BaseLink);
export default Link;
