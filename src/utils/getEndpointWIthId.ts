export const getEndpointWithId = (endpoint: string, id: number): string => {
  return endpoint.replace(':id', `${id}`);
}
