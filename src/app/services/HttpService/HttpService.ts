import { buildQueryParams } from 'src/app/services/HttpService/buildQueryParams.util';
import { HttpRequestQueryParams } from 'src/model/httpRequestDetails.model';

export type HttpServiceResponse<T> = {
  data: T;
  totalElements?: number;
}
export const HttpService = {
  get: async <T>(url: string, queryParams?: HttpRequestQueryParams): Promise<T | null> => {
    const queryParamsString = buildQueryParams(queryParams);
    try {
      const response = await fetch(`${url}${queryParamsString}`);
      if (!response.ok) {
        return null;
      }
      return  response.json();
    } catch (error) {
      throw Error('Error while fetching data');
    }
  },
  getWithPagination: async <T>(url: string, queryParams?: HttpRequestQueryParams): Promise<HttpServiceResponse<T>> => {
    const queryParamsString = buildQueryParams(queryParams);
    try {
      const response = await fetch(`${url}${queryParamsString}`);
      if (!response.ok) {
        throw Error('Error while fetching data');
      }
      const data = await response.json();
      const totalElements = +(response.headers.get('X-Total-Count') || 1);
      return {
        data,
        totalElements
      };
    } catch (error) {
      throw Error('Error while fetching data');
    }
  }
};
