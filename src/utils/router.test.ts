import { expect } from 'chai';
import { router } from './router';
import ClientErrorPageComponent from '../pages/404';
import Block from './block';

describe('router', () => {
  const testTextContent = 'test text content';
  class TestComponent extends Block {
    render() {
      const str = this.compile(`<div id="test">${testTextContent}</div>`, this.props);
      return str;
    }
  }

  router.use('/clientError', ClientErrorPageComponent as any);
  router.use('/test1', TestComponent as any);

  const TEST_ROUTES = {
    testRoute1: '/test1',
    testRoute2: '/test2',
  };

  it('history gets affected by router.go', () => {
    const historyBefore = window.history.length;
    router.go('/login');
    const historyAfter = window.history.length;
    expect(historyAfter - historyBefore).to.eq(1);
  });

  it('history gets affected by router.back', () => {
    const historyBefore = window.history.length;
    router.go('/login');
    router.back();
    const historyAfter = window.history.length;

    const timer = setTimeout(() => {
      expect(historyAfter - historyBefore).to.eq(0);
    }, 100);

    clearTimeout(timer);
  });

  it('go method places on the right url', () => {
    router.go(TEST_ROUTES.testRoute1);
    expect(window.location.pathname).to.eq(TEST_ROUTES.testRoute1);
  });

  it('back method places on the right url', () => {
    router.go(TEST_ROUTES.testRoute1);
    router.go(TEST_ROUTES.testRoute2);
    window.history.back();
    window.onpopstate = () => {
      expect(window.location.pathname).to.eq(TEST_ROUTES.testRoute1);
    };
  });

  it('router render correct content on the page', () => {
    router.go(TEST_ROUTES.testRoute1);
    expect(document.getElementById('test')?.textContent).to.eq(testTextContent);
  });
});
