enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type OptionsType = {
  method: METHODS;
  data?: any;
  timeout?: number;
};

function queryStringify(data: Record<string, any>) {
  let result = '?';

  for (const key in data) {
    if (data[key]) {
      result += `${key}=${data[key].toString()}&`;
    }
  }
  if (result[result.length - 1] === '&') {
    return result.slice(0, -1);
  }

  return result;
}

class HTTPTransport {
  get = (url: string, options: OptionsType = { method: METHODS.GET }) => {
    return this.request(url, { ...options, data: queryStringify(options.data), method: METHODS.GET }, options.timeout);
  };

  post(url: string, options: OptionsType) {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  }

  put(url: string, options: OptionsType) {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  }

  delete(url: string, options: OptionsType) {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  }

  request = (url: string, options: OptionsType = { method: METHODS.GET }, timeout = 5000) => {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      const newUrl = method === METHODS.GET || data ? `${url}${data}` : url;
      xhr.open(method, newUrl);
      xhr.timeout = timeout;

      xhr.onload = function xhrOnload() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}

export default HTTPTransport;
