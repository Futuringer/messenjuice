import sinon from 'sinon';
import { expect } from 'chai';
import HTTPTransport from './HTTPTransport';

describe('HTTPTransport', () => {
  let requests: sinon.SinonFakeXMLHttpRequest[] = [];
  const XHR = sinon.useFakeXMLHttpRequest();
  const transport = new HTTPTransport('/auth');

  XHR.onCreate = function (xhr) {
    requests.push(xhr);
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global.XMLHttpRequest = XHR;

  afterEach(() => {
    requests = [];
  });

  describe('base methods', () => {
    it('should handle GET request', () => {
      transport.get('/login');

      expect(requests[0].method).to.eq('GET');
    });

    it('should handle POST request', () => {
      transport.post('/login');

      expect(requests[0].method).to.eq('POST');
    });

    it('should handle PUT request', () => {
      transport.put('/login');

      expect(requests[0].method).to.eq('PUT');
    });

    it('should handle DELETE request', () => {
      transport.delete('/login', { data: { field: 'value' } });
      expect(requests[0].method).to.eq('DELETE');
    });
  });

  describe('parameters in options', () => {
    it('should handle body parameters', () => {
      transport.delete('/login', { data: { field: 'value' } });
      expect(requests[0].requestBody).to.eq('{"field":"value"}');
    });

    it('should transform payload to url in GET request', () => {
      transport.get('/login', { data: { field: 'value' } });
      expect(requests[0].url.split('/auth')[1]).to.eq('/login?field=value');
    });

    it('should handle headers in options', () => {
      transport.get('/login', { headers: { token: 'Test_token' } });
      expect(requests[0].requestHeaders.token).to.eq('Test_token');
    });
  });
});
