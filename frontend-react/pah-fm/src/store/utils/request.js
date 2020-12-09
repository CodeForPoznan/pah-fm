import axios from 'axios';
import {
  toCamelCase,
  toSnakeCase,
} from 'case-converter';

const BACKEND_URL = 'http://localhost:8080/api';

class Request {
  constructor() {
    this.initConfig();
  }

  initConfig() {
    this.instance = axios.create({
      baseURL: BACKEND_URL,
    });

    this.instance.interceptors.request.use(async config => ({
      ...config,
      data: config.data ? toSnakeCase(config.data) : config.data,
      params: config.params ? toSnakeCase(config.params) : config.params,
    }));

    this.instance.interceptors.response.use(response => ({
      ...response,
      data: toCamelCase(response.data),
    }), async error => {
      return Promise.reject(this.parseError(error));
    }
    );
  }

  parseError(error) {
    const { response = {} } = error;

    return {
      ...error,
      response: {
        ...response,
        data: {
          ...toCamelCase(response.data),
          _error: response.data ? response.data.non_field_errors : [],
        },
      },
    };
  }

  get(...args) {
    return this.instance.get(...args);
  }

  post(...args) {
    return this.instance.post(...args);
  }

  options(...args) {
    return this.instance.options(...args);
  }

  patch(...args) {
    return this.instance.patch(...args);
  }

  put(...args) {
    return this.instance.put(...args);
  }

  delete(...args) {
    return this.instance.delete(...args);
  }
}

export default new Request();
