import { HttpRequestQueryParams } from 'src/model/httpRequestDetails.model';

export const buildQueryParams = (requestDetails?: HttpRequestQueryParams): string => {
  if (!requestDetails) {
    return '';
  }
  const queryParams = [];
  if (requestDetails.page) {
    queryParams.push(`_page=${requestDetails.page}`);
  }
  if (requestDetails.pageLimit) {
    queryParams.push(`_limit=${requestDetails.pageLimit}`);
  }
  if (requestDetails.searchQuery) {
    queryParams.push(`q=${requestDetails.searchQuery}`);
  }

  return queryParams.length ? '?' + queryParams.join('&') : '';
};
