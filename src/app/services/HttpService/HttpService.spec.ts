// unit tests for http service

import { buildQueryParams } from './buildQueryParams.util';
import { HttpService } from './HttpService';

jest.mock('./buildQueryParams.util', () => ({
  buildQueryParams: jest.fn()
}));

describe('HttpService', () => {
  const mockFetch = jest.fn();
  const mockJson = jest.fn();
  const mockHeaders = {
    get: jest.fn()
  };
  const mockResponse = {
    json: mockJson,
    headers: mockHeaders
  };
  const mockUrl = 'http://mock-url.com';
  const mockQueryParams = {
    page: 1,
    pageLimit: 10,
    searchQuery: 'mock search query'
  };
  const mockQueryParamsString = '?mock query params string';
  const mockData = {
    mockData: 'mock data'
  };
  const mockTotalElements = 100;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockResolvedValue(mockResponse);
    mockJson.mockResolvedValue(mockData);
    mockHeaders.get.mockReturnValue(mockTotalElements);
    (buildQueryParams as jest.Mock).mockReturnValue(mockQueryParamsString);
  });

  it('should call fetch with url and query params string', async () => {
    await HttpService.get(mockUrl, mockQueryParams);

    expect(buildQueryParams).toHaveBeenCalledWith(mockQueryParams);
    expect(mockFetch).toHaveBeenCalledWith(`${mockUrl}${mockQueryParamsString}`);
  });

  it('should call fetch without query params string', async () => {
    await HttpService.get(mockUrl);

    expect(buildQueryParams).toHaveBeenCalledWith(undefined);
    expect(mockFetch).toHaveBeenCalledWith(mockUrl);
  });

  it('should call json on response', async () => {
    await HttpService.get(mockUrl);

    expect(mockJson).toHaveBeenCalled();
  });

  it('should call get on headers', async () => {
    await HttpService.get(mockUrl);

    expect(mockHeaders.get).toHaveBeenCalledWith('X-Total-Count');
  });

  it('should return data and total elements', async () => {
    const response = await HttpService.get(mockUrl);

    expect(response).toEqual({
      data: mockData,
      totalElements: mockTotalElements
    });
  });

  it('should return data and total elements as 1 if no total elements', async () => {
    mockHeaders.get.mockReturnValue(null);

    const response = await HttpService.get(mockUrl);

    expect(response).toEqual({
      data: mockData,
      totalElements: 1
    });
  });
});
