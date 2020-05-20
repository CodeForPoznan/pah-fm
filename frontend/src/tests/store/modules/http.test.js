import http from '../../../store/modules/http';
import { TOKEN } from '../../../store/modules/http/state';
import { AUTH_HEADER } from '../../../store/modules/http/getters';

const { getters } = http;

const exampleJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImhlbGxvQGNvZGVmb3Jwb3puYW4ucGwiLCJleHAiOjE1OTE5ODIxMTYsImVtYWlsIjoiaGVsbG9AY29kZWZvcnBvem5hbi5wbCJ9.HeTCwtaVh8Ws0ZwMqVRpxJE5hdkgSrLcdlyghN9M9WI';

describe('HTTP Module', () => {
  it('AUTH_HEADER returns valid header object', () => {
    let state = {
      [TOKEN]: exampleJWT,
    };

    let header = getters[AUTH_HEADER](state);
    expect(header).toStrictEqual({
      Authorization: `JWT ${exampleJWT}`,
    });

    state = {
      [TOKEN]: null,
    };

    header = getters[AUTH_HEADER](state);
    expect(header).toStrictEqual({});
  });
});
