import { getEndpointWithId } from 'src/utils/getEndpointWIthId';

describe('getEndpointWithId', () => {
  it('replaces `:id` in endpoint string with given id', () => {
    const endpoint = '/api/heroes/:id';
    const id = 1;
    const expected = '/api/heroes/1';

    const result = getEndpointWithId(endpoint, id);

    expect(result).toBe(expected);
  });

  it('returns endpoint string unchanged if no `:id` is present', () => {
    const endpoint = '/api/heroes';
    const id = 1;

    const result = getEndpointWithId(endpoint, id);

    expect(result).toBe(endpoint);
  });
});
