import Handlebars from 'handlebars';
import EventBus from './eventBus';
import { isEqual } from './helpers';

type P = Record<string, any>;
class Block {
  id = Math.floor(Math.random() * 100000);

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _element: HTMLElement | null = null;

  _meta: { props: any };

  children: Record<string, Block | Block[]>;

  props: P;

  eventBus: () => EventBus;

  constructor(propsAndChildren: P) {
    const { children, props } = this._getChildren(propsAndChildren);
    this.children = children;

    const eventBus = new EventBus();
    this._meta = {
      props,
    };

    this.props = this._makePropsProxy(props as P);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildren(propsAndChildren: P): { props: P; children: Record<string, Block | Block[]> } {
    const children: Record<string, Block | Block[]> = {};
    const props: Record<string, any> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        children[key] = value;
      }
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props: props as P, children };
  }

  _addEvents() {
    const { events = {} } = this.props as P & { events: Record<string, () => void> };

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName], false);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props as P & { events: Record<string, () => void> };

    Object.keys(events).forEach(eventName => {
      this._element?.removeEventListener(eventName, events[eventName], false);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    this._element = this._createDocumentElement();
  }

  _init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    this.init();
  }

  init() {}

  dispatchComponentDidMount() {
    console.log('dispatchComponentDidMount');
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach(child => {
      if (!Array.isArray(child)) {
        child.dispatchComponentDidMount();
      }
    });
  }

  componentDidMount() {}

  _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidUpdate(oldProps: P, newProps: P) {
    // console.log('oldProps, newProps', oldProps, newProps, isEqual(oldProps, newProps));
    return !isEqual(oldProps, newProps);
  }

  setProps = (nextProps: Partial<P>) => {
    if (!nextProps) {
      return;
    }
    const newProps = { ...this.props, ...nextProps };
    Object.assign(this.props, newProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();
    const newElement = block.firstElementChild as HTMLElement;

    this._removeEvents();

    if (this._element) {
      this._element.replaceWith(newElement);
      this._element = newElement;
    }

    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  protected compile(template: string, props: any) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map(item => `<div data-id="${item.id}"></div>`);
        propsAndStubs[key] = propsAndStubs[key].join('');
      } else {
        propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
      }
    });

    const tmp = Handlebars.compile(template);
    const html = tmp(propsAndStubs);
    const temp = document.createElement('template');
    temp.innerHTML = html;

    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach(item => {
          const stub = temp.content.querySelector(`[data-id="${item.id}"]`);
          if (stub) {
            item.getContent()?.append(...Array.from(stub.childNodes));
            stub.replaceWith(item.getContent()!);
          }
        });
      } else {
        const stub = temp.content.querySelector(`[data-id="${component.id}"]`);
        if (stub) {
          component.getContent()?.append(...Array.from(stub.childNodes));
          stub.replaceWith(component.getContent()!);
        }
      }
    });

    return temp.content;
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: P) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldTarget = { ...target };
        target[prop as keyof P] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement() {
    return document.createElement('div');
  }

  show() {
    if (this.getContent()) {
      this.getContent()!.style.display = 'block';
    }
  }

  hide() {
    if (this.getContent()) {
      this.getContent()!.style.display = 'none';
    }
  }
}

export default Block;
