// unit tests for buildQueryParams util
import { buildQueryParams } from 'src/app/services/HttpService/buildQueryParams.util';

describe('buildQueryParams util', () => {
  it('should return empty string when requestDetails is undefined', () => {
    const requestDetails = undefined;
    const queryParams = buildQueryParams(requestDetails);
    expect(queryParams).toBe('');
  });

  it('should return empty string when requestDetails is empty object', () => {
    const requestDetails = {};
    const queryParams = buildQueryParams(requestDetails);
    expect(queryParams).toBe('');
  });

  it('should return query params string when requestDetails is defined', () => {
    const requestDetails = {
      page: 1,
      pageLimit: 10,
      searchQuery: 'test'
    };
    const queryParams = buildQueryParams(requestDetails);
    expect(queryParams).toBe('?_page=1&_limit=10&q=test');
  });

  it('should return query params string when requestDetails is defined and some params are missing', () => {
    const requestDetails = {
      page: 1,
      searchQuery: 'test'
    };
    const queryParams = buildQueryParams(requestDetails);
    expect(queryParams).toBe('?_page=1&q=test');
  });
});
