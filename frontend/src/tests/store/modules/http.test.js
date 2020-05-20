import http from '../../../store/modules/http';
import { TOKEN } from '../../../store/modules/http/state';
import { AUTH_DATA } from '../../../store/modules/http/getters';
import { GET, POST } from '../../../store/modules/http/actions';

const { getters, actions } = http;

const exampleJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImhlbGxvQGNvZGVmb3Jwb3puYW4ucGwiLCJleHAiOjE1OTE5ODIxMTYsImVtYWlsIjoiaGVsbG9AY29kZWZvcnBvem5hbi5wbCJ9.HeTCwtaVh8Ws0ZwMqVRpxJE5hdkgSrLcdlyghN9M9WI';

describe('HTTP Module', () => {
  it('AUTH_DATA returns valid options object', () => {
    let state = {
      [TOKEN]: exampleJWT,
    };

    let requestOptions = {
      method: 'POST',
    };

    let headers = getters[AUTH_DATA](state)({ requestOptions }).headers;
    expect(headers).toStrictEqual({
      Authorization: `JWT ${exampleJWT}`,
    });

    requestOptions = {
      ...requestOptions,
      headers: {
        Accept: 'application/json',
      },
    };

    headers = getters[AUTH_DATA](state)({ requestOptions }).headers;
    expect(headers).toStrictEqual({
      Accept: 'application/json',
      Authorization: `JWT ${exampleJWT}`,
    });

    delete requestOptions.headers;

    state = {
      [TOKEN]: null,
    };

    headers = getters[AUTH_DATA](state)({ requestOptions }).headers;
    expect(headers).toBe(undefined);
  });

  it('POST runs fetch', () => {
    const state = {
      [TOKEN]: exampleJWT,
    };

    const mockGetters = {
      [AUTH_DATA]: payload => getters[AUTH_DATA](state)(payload),
    };

    const payload = { dummy: 'payload' };

    global.fetch = jest.fn(async (url, options) => {
      // Valid method
      expect(options.method).toBe('POST');
      // Authorization header injected
      expect(options.headers.Authorization).toBe(`JWT ${exampleJWT}`);
      // Payload is stringified
      expect(typeof options.body).toBe('string');
      // Content-Type is json
      expect(options.headers['Content-Type']).toBe('application/json; charset=utf-8')
      return Promise.resolve({
        status: 200,
        json: async () => ({ data: 'Do. Or do not. There is no try.' }) });
    });

    actions[POST]({ getters: mockGetters }, { url: 'test', payload })
      .then((response) => {
        expect(response.data).toBe('Do. Or do not. There is no try.');
      });
    expect(fetch.mock.calls.length).toBe(1);
  });

  it('GET runs fetch', () => {
    const state = {
      [TOKEN]: exampleJWT,
    };

    const mockGetters = {
      [AUTH_DATA]: payload => getters[AUTH_DATA](state)(payload),
    };

    global.fetch = jest.fn(async (url, options) => {
      // Use default method
      expect(options.method).toBe(undefined);
      // Authorization header injected
      expect(options.headers.Authorization).toBe(`JWT ${exampleJWT}`);
      // Content-Type is json
      return Promise.resolve({
        status: 200,
        json: async () => ({ data: 'Do. Or do not. There is no try.' }) });
    });

    actions[GET]({ getters: mockGetters }, { url: 'test' })
      .then((response) => {
        expect(response.data).toBe('Do. Or do not. There is no try.');
      });
    expect(fetch.mock.calls.length).toBe(1);
  })
});
