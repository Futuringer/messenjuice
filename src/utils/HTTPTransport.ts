enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type OptionsType = {
  data?: any;
  timeout?: number;
  headers?: Record<string, string>;
};

function queryStringify(data: Record<string, any>) {
  if (!data) {
    return '';
  }

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
  static API_URL = 'https://ya-praktikum.tech/api/v2';

  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get<Response>(url: string, options?: OptionsType) {
    console.log(options);
    return this.request<Response>(
      url,
      { ...options, data: queryStringify(options?.data), method: METHODS.GET },
      options?.timeout,
    );
  }

  post<Response>(url: string, options?: OptionsType) {
    return this.request<Response>(url, { ...options, method: METHODS.POST }, options?.timeout);
  }

  put<Response>(url: string, options?: OptionsType) {
    return this.request<Response>(url, { ...options, method: METHODS.PUT }, options?.timeout);
  }

  delete<Response>(url: string, options?: OptionsType) {
    return this.request<Response>(url, { ...options, method: METHODS.DELETE }, options?.timeout);
  }

  request<Response>(
    url: string,
    options: OptionsType & { method: METHODS } = { method: METHODS.GET },
    timeout = 5000,
  ): Promise<Response> {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      const newUrl =
        method === METHODS.GET && data
          ? `${HTTPTransport.API_URL}${this.baseUrl}${url}${data}`
          : `${HTTPTransport.API_URL}${this.baseUrl}${url}`;
      xhr.open(method, newUrl);
      xhr.timeout = timeout;

      xhr.onload = function xhrOnload() {
        resolve(xhr.response);
      };

      xhr.onreadystatechange = e => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      const isFormData = data instanceof FormData;

      if (!isFormData) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
      if (headers) {
        Object.keys(headers).forEach(key => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      xhr.withCredentials = true;
      xhr.responseType = 'json';
      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (isFormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

export default HTTPTransport;
