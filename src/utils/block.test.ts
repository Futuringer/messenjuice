import { expect } from 'chai';
import Block from './block';

describe('Block', () => {
  const testTextContent = 'test text content';
  const testNewTextContent = 'test text content';

  class TestComponent extends Block {
    constructor(props?: any) {
      super({ ...props });
    }

    render() {
      const str = this.compile(`<div id="test">{{content}}</div>`, this.props);
      return str;
    }
  }

  const testComponent = new TestComponent({ content: testTextContent });
  testComponent.init();

  it('should mount resource on init', () => {
    expect(testComponent.element).not.eq(null);
  });

  it('should handle initial props', () => {
    expect(testComponent.element?.textContent).eq(testTextContent);
  });

  it('should handle props change', () => {
    testComponent.setProps({
      content: testNewTextContent,
    });
    expect(testComponent.element?.textContent).eq(testNewTextContent);
  });
});
