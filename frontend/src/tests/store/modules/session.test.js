import session, { TOKEN, AUTH_HEADER } from '../../../store/modules/session';

const { getters } = session;

const exampleJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImhlbGxvQGNvZGVmb3Jwb3puYW4ucGwiLCJleHAiOjE1OTE5ODIxMTYsImVtYWlsIjoiaGVsbG9AY29kZWZvcnBvem5hbi5wbCJ9.HeTCwtaVh8Ws0ZwMqVRpxJE5hdkgSrLcdlyghN9M9WI';

describe('Session Module', () => {
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
