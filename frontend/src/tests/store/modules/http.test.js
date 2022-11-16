import http from '../../../store/modules/http';
import { TOKEN } from '../../../store/modules/http/state';
import { AUTH_DATA } from '../../../store/modules/http/getters';
import { SET_TOKEN } from '../../../store/modules/http/mutations';
import { GET, POST, GET_AUTH_HEADER } from '../../../store/modules/http/actions';

const { getters, actions } = http;

const exampleJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImhlbGxvQGNvZGVmb3Jwb3puYW4ucGwiLCJleHAiOjE1OTE5ODIxMTYsImVtYWlsIjoiaGVsbG9AY29kZWZvcnBvem5hbi5wbCJ9.HeTCwtaVh8Ws0ZwMqVRpxJE5hdkgSrLcdlyghN9M9WI';

describe('HTTP Module', () => {
  const state = {
    [TOKEN]: exampleJWT,
  };

  it('AUTH_DATA returns valid options object', () => {
    let requestOptions = {
      method: 'POST',
    };

    // eslint-disable-next-line
    let headers = getters[AUTH_DATA](state)({ requestOptions }).headers;
    expect(headers).toStrictEqual({
      Authorization: `Bearer ${exampleJWT}`,
    });

    requestOptions = {
      ...requestOptions,
      headers: {
        Accept: 'application/json',
      },
    };

    // eslint-disable-next-line
    headers = getters[AUTH_DATA](state)({ requestOptions }).headers;
    expect(headers).toStrictEqual({
      Accept: 'application/json',
      Authorization: `Bearer ${exampleJWT}`,
    });

    delete requestOptions.headers;

    const emptyState = {
      [TOKEN]: null,
    };

    // eslint-disable-next-line
    headers = getters[AUTH_DATA](emptyState)({ requestOptions }).headers;
    expect(headers).toBe(undefined);
  });

  it('POST runs fetch', () => {
    const mockDispatch = jest.fn((type, payload) => {
      expect(type).toBe(GET_AUTH_HEADER);
      return getters[AUTH_DATA](state)(payload);
    });

    const payload = { dummy: 'payload' };

    global.fetch = jest.fn((url, options) => {
      // Valid method
      expect(options.method).toBe('POST');
      // Authorization header injected
      expect(options.headers.Authorization).toBe(`Bearer ${exampleJWT}`);
      // Payload is stringified
      expect(typeof options.body).toBe('string');
      // Content-Type is json
      expect(options.headers['Content-Type']).toBe('application/json; charset=utf-8');
      return new Promise(() => ({
        status: 200,
        json: async () => ({ data: 'Do. Or do not. There is no try.' }) }));
    });

    actions[POST]({ dispatch: mockDispatch }, { url: 'test', payload })
      .then((response) => {
        expect(response.data).toBe('Do. Or do not. There is no try.');
        expect(fetch).toHaveBeenCalledTimes(1);
      });
  });

  it('GET runs fetch', () => {
    const mockDispatch = jest.fn((type, payload) => {
      expect(type).toBe(GET_AUTH_HEADER);
      return getters[AUTH_DATA](state)(payload);
    });

    global.fetch = jest.fn((url, options) => {
      // Use default method
      expect(options.method).toBe(undefined);
      // Authorization header injected
      expect(options.headers.Authorization).toBe(`Bearer ${exampleJWT}`);
      return new Promise(res => res({
        status: 200,
        json: async () => ({ data: 'Do. Or do not. There is no try.' }) }));
    });

    actions[GET]({ dispatch: mockDispatch }, { url: 'test' })
      .then((response) => {
        expect(response.data).toBe('Do. Or do not. There is no try.');
        expect(fetch).toHaveBeenCalledTimes(1);
      });
  });

  it('GET_AUTH_HEADER runs AUTH_DATA getter', () => {
    const commit = jest.fn((type, value) => {
      expect(type).toBe(SET_TOKEN);
      // It should only change token to null
      expect(value).toBe(null);
    });

    const mockGetters = {
      [AUTH_DATA]: payload => getters[AUTH_DATA](state)(payload),
    };

    const payload = { requestOptions: {} };

    const authHeader = actions[GET_AUTH_HEADER]({ state, getters: mockGetters, commit }, payload);
    expect.extend({
      toBeOneOf(r, a) {
        const received = JSON.stringify(r);
        const alternatives = a.map(value => JSON.stringify(value));
        const pass = alternatives.indexOf(received) !== -1;
        if (pass) {
          return {
            message: () => `expected ${received} not to be one of ${alternatives}`,
            pass: true,
          };
        }
        return {
          message: () => `expected ${received} to be one of ${alternatives}`,
          pass: false,
        };
      },
    });
    // Since exampleJWT will expire at some time
    expect(authHeader.headers).toBeOneOf([
      {
        Authorization: `Bearer ${exampleJWT}`,
      },
      undefined,
    ]);
  });
});
