import { isEqual } from './helpers';
import Block from './block';
import store from './store';
import chatsController from '../controllers/chatsController';
import { ROUTES } from './consts';

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  if (root && block.getContent()) {
    root.innerHTML = '';

    root.append(block.getContent()!);
  }
  return root;
}

class Route {
  private block: Block | null = null;

  constructor(private pathname: string, private BlockClass: typeof Block, private query: string) {}

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this.block) {
      this.block = null;
    }

    store.set('currentFormData.errorText', '');
    store.set('currentFormData.successText', '');
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  render() {
    if (!this.block) {
      this.block = new this.BlockClass({});
      render(this.query, this.block);
      return;
    }

    this.block.show();
  }
}

class Router {
  private static instance: Router;

  routes: Route[] = [];

  private history: History = window.history;

  private currentRoute: Route | null = null;

  constructor(private query: string) {
    if (Router.instance) {
      return Router.instance;
    }
    Router.instance = this;
  }

  use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, this.query);
    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      this.onRoute((event?.currentTarget as Window)?.location?.pathname);
    };

    this.onRoute(window.location.pathname);
  }

  private onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;

    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this.onRoute(pathname);
  }

  back() {
    this.history.go(-1);
  }

  forward() {
    this.history.go(1);
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }
}

class MyRouter extends Router {
  go(pathname: string): void {
    super.go(pathname);
    if (pathname === ROUTES.MESSENGER) {
      chatsController.getChats({});
    }
  }

  getRoute(pathname: string): Route {
    return this.routes.find(route => route.match(pathname)) || this.getRoute(ROUTES.CLIENTERROR);
  }
}

const router = new MyRouter('#root');

export { Route, Router, router };
