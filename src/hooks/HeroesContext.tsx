import React, { createContext, PropsWithChildren, useState } from 'react';

import uniqBy from 'lodash/uniqBy';
import { HttpService } from 'src/app/services/HttpService/HttpService';
import { ApiEndpoints } from 'src/config/apiEndpoints';
import { Hero } from 'src/model/hero.model';
import { HttpRequestQueryParams } from 'src/model/httpRequestDetails.model';
import { LoadingStatus } from 'src/model/loadingStatus.enum';
import { Pagination } from 'src/model/pagination.model';
type HeroesState = Pagination & { heroes: Hero[] } & { status: LoadingStatus };
const LIMIT_PER_PAGE = 10;

const defaultHeroesState: HeroesState = {
  heroes: [],
  currentPage: 0,
  totalElements: Infinity,
  status: LoadingStatus.IDLE
};

export const HeroesContext = createContext<{
  state: HeroesState;
  fetchHeroes: (nameSearchQuery?: string) => Promise<void>;
  fetchHeroById: (id: number) => Promise<void>;
  fetchHeroesByName: (names: string[]) => Promise<void>;
}>({
  state: defaultHeroesState,
  fetchHeroes: () => Promise.resolve(),
  fetchHeroById: () => Promise.resolve(),
  fetchHeroesByName: () => Promise.resolve()
});
export const HeroesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<HeroesState>(defaultHeroesState);

  const fetchHeroes = async (searchQuery?: string) => {
    setState({ ...state, status: LoadingStatus.LOADING });
    try {
      const queryParams: HttpRequestQueryParams = {
        page: state.currentPage + 1,
        pageLimit: LIMIT_PER_PAGE,
        searchQuery
      };

      const { data: heroes, totalElements } = await HttpService.get<Hero[]>(ApiEndpoints.heroes, queryParams);

      setState(status => ({
        heroes: uniqBy([...status.heroes, ...heroes], 'id'),
        currentPage: status.currentPage + 1,
        status: LoadingStatus.LOADED,
        totalElements: totalElements ?? Infinity,
      }));
    } catch (error) {
      console.error(error);
      setState({ ...state, status: LoadingStatus.ERROR });
    }
  };

  const fetchHeroById = async (id: number) => {
    //   TODO: implement
  };

  const fetchHeroesByName = async (names: string[]) => {
    //   TODO: implement
  };

  return (
    <HeroesContext.Provider
      value={{ state, fetchHeroes, fetchHeroById, fetchHeroesByName }}>
      {children}
    </HeroesContext.Provider>
  );
};
