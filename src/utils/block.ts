/* eslint-disable class-methods-use-this */
import Handlebars from 'handlebars';
import EventBus, { Handler } from './eventBus';

class Block<P extends Record<string, any> = any> {
  id = Math.floor(Math.random() * 100000);

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _element: HTMLElement | null = null;

  _meta: any;

  props: P;

  eventBus: () => EventBus;

  // eslint-disable-next-line @typescript-eslint/default-param-last
  constructor(propsAndChildren: P) {
    const { children, props } = this._getChildren(propsAndChildren);
    this.children = children;

    const eventBus = new EventBus();
    this._meta = {
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildren(propsAndChildren) {
    const children = {};
    const props = {};

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

    return { children, props };
  }

  _addEvents() {
    const { events = {} } = this.props as P & { events: Record<string, () => void> };

    Object.keys(events).forEach(eventName => {
      console.log(eventName, this._element);
      this._element?.addEventListener(eventName, events[eventName], false);
      // this._element?.addEventListener('click', () => console.log(12));
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  _init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    this.init();
  }

  init() {}

  _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    // Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
  }

  _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidUpdate(oldProps: P, newProps: P) {
    return oldProps !== newProps;
  }

  setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();
    const newElement = block.firstElementChild as HTMLElement;

    if (this._element) {
      this._element = newElement;
    }

    this._addEvents();
    // console.log('props', this.props);
    // console.log('this._element', this._element);
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  protected compile(template: string, props: any) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      // console.log('child', child);

      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map(child => `<div data-id="${child.id}"></div>`);
      } else {
        propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
      }
    });

    // console.log('propsAndStubs', propsAndStubs);

    const tmp = Handlebars.compile(template);
    // console.log('tmp', template);
    const html = tmp(propsAndStubs);
    // console.log('html', html);
    const temp = document.createElement('template');

    const filteredHtml = html.replace(',', '');
    temp.innerHTML = filteredHtml;

    // console.log('TEMP', temp.innerHTML);

    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach(item => {
          const stub = temp.content.querySelector(`[data-id="${item.id}"]`);
          item.getContent()?.append(...Array.from(stub.childNodes));
          stub.replaceWith(item.getContent()!);
        });
      } else {
        const stub = temp.content.querySelector(`[data-id="${component.id}"]`);
        component.getContent()?.append(...Array.from(stub.childNodes));
        stub.replaceWith(component.getContent()!);
      }

      // if (!stub) {
      // }
    });

    // console.log('temp', temp.content);
    // console.log('html', html);
    return temp.content;
    // return html;
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: P) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldTarget = { ...target };
        // eslint-disable-next-line no-param-reassign
        target[prop as keyof P] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
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
