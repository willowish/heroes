const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ApiEndpoints = {
  heroes: `${BASE_URL}/heroes`,
  heroWithId: (id: number): string => `${BASE_URL}/heroes/${id}`,
};
