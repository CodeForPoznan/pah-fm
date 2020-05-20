import http from '../../../store/modules/http';
import { TOKEN } from '../../../store/modules/http/state';
import { AUTH_DATA } from '../../../store/modules/http/getters';

const { getters } = http;

const exampleJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImhlbGxvQGNvZGVmb3Jwb3puYW4ucGwiLCJleHAiOjE1OTE5ODIxMTYsImVtYWlsIjoiaGVsbG9AY29kZWZvcnBvem5hbi5wbCJ9.HeTCwtaVh8Ws0ZwMqVRpxJE5hdkgSrLcdlyghN9M9WI';

describe('HTTP Module', () => {
  it('AUTH_DATA returns valid options object', () => {
    let state = {
      [TOKEN]: exampleJWT,
    };

    let requestOptions = {
      method: 'POST'
    }

    let headers = getters[AUTH_DATA](state)({ requestOptions }).headers
    expect(headers).toStrictEqual({
      Authorization: `JWT ${exampleJWT}`,
    });

    requestOptions = {
      ...requestOptions,
      headers: {
        Accept: 'application/json'
      }
    }

    headers = getters[AUTH_DATA](state)({ requestOptions }).headers
    expect(headers).toStrictEqual({
      Accept: 'application/json',
      Authorization: `JWT ${exampleJWT}`
    })

    delete requestOptions.headers

    state = {
      [TOKEN]: null,
    };

    headers = getters[AUTH_DATA](state)({ requestOptions }).headers
    expect(headers).toBe(undefined);
  });
});
