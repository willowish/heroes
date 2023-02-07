import React, { createContext, PropsWithChildren, useState } from 'react';

import { HttpService } from 'src/app/services/HttpService/HttpService';
import { ApiEndpoints } from 'src/config/apiEndpoints';
import { Hero } from 'src/model/hero.model';
import { HttpRequestQueryParams } from 'src/model/httpRequestDetails.model';
import { LoadingStatus } from 'src/model/loadingStatus.enum';
import { Pagination } from 'src/model/pagination.model';

type HeroesState = Pagination
  & { heroesMap: Record<number, Hero>, heroesToDisplay: number[], searchQuery: string }
  & { status: LoadingStatus };

const defaultHeroesState: HeroesState = {
  heroesMap: {},
  heroesToDisplay: [],
  currentPage: 1,
  totalElements: Infinity,
  status: LoadingStatus.LOADING,
  searchQuery: ''
};

export const HeroesContext = createContext<{
  state: HeroesState;
  fetchHeroes: (page?: number, nameSearchQuery?: string) => Promise<void>;
  fetchHeroById: (id: number) => Promise<void>;
  fetchHeroesByName: (names: string) => Promise<void>;
  getHeroById: (id: number) => Hero | null;
}>({
  state: defaultHeroesState,
  fetchHeroes: () => Promise.resolve(),
  fetchHeroById: () => Promise.resolve(),
  fetchHeroesByName: () => Promise.resolve(),
  getHeroById: () => null,
});
const LIMIT_PER_PAGE = 20;

export const HeroesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<HeroesState>(defaultHeroesState);

  const fetchHeroes = async (page = 1) => {
    try {
      const queryParams: HttpRequestQueryParams = {
        page: page,
        pageLimit: LIMIT_PER_PAGE,
        searchQuery: state.searchQuery
      };
      const { data: heroes, totalElements } = await HttpService.get<Hero[]>(ApiEndpoints.heroes, queryParams);

      setState(status => {
        const array = [...status.heroesToDisplay, ...heroes.map(hero => hero.id)];
        console.log(array);

        return ({
          ...status,
          heroesMap: heroes
            .reduce((acc, hero) => ({ ...acc, [hero.id]: hero }), status.heroesMap),
          heroesToDisplay: [...new Set(array)],
          currentPage: page,
          status: LoadingStatus.LOADED,
          totalElements: totalElements ?? Infinity
        });
      });
    } catch (error) {
      console.error(error);
      setState(state => ({ ...state, status: LoadingStatus.ERROR }));
    }
  };

  const fetchHeroById = async (id: number) => {
    const { data: hero } = await HttpService.get<Hero>(ApiEndpoints.heroWithId(id));
    setState(status => ({
      ...status,
      heroesMap: {
        ...status.heroesMap,
        [hero.id]: hero
      },
      status: LoadingStatus.LOADED,
    }));
  };

  const getHeroById = (id: number): Hero | null => {
      return state.heroesMap[id] ?? null;
  }

  const fetchHeroesByName = async (name: string) => {
    setState({ ...state, searchQuery: name, heroesToDisplay: [], currentPage: 1, totalElements: Infinity });
    fetchHeroes(1);
  };

  return (
    <HeroesContext.Provider
      value={{ state, fetchHeroes, fetchHeroById, fetchHeroesByName, getHeroById }}>
      {children}
    </HeroesContext.Provider>
  );
};
