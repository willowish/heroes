import React, { useCallback } from 'react';

import { Center, Flex, Spinner, Text } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroller';
import { HeroBasicInfo } from 'src/app/pages/mainPage/components/heroBasicInfo/heroBasicInfo';
import { EmptyList } from 'src/app/pages/mainPage/components/heroesList/components/emptyList/emptyList';
import { HeroesSearch } from 'src/app/pages/mainPage/components/heroesSearch/heroesSearch';
import { useHeroes } from 'src/hooks/useHeroes';

export const HeroesList: React.FC = () => {
  const { fetchHeroes, state } = useHeroes();

  const fetchNextPage = useCallback(() => {
    fetchHeroes(state.currentPage + 1);
  }, [state.searchQuery, state.currentPage]);
  console.log(state.heroesToDisplay);

  return (
    <Flex w='100%' justifyContent={'center'} flexDir={'column'} gap={'24px'}>
      <Text textAlign={'center'} fontSize='4xl'>Heroes List</Text>
      <HeroesSearch />
      <InfiniteScroll
        pageStart={1}
        loadMore={fetchNextPage}
        hasMore={state.totalElements > state.heroesToDisplay.length}
        loader={<Center w={'100%'} mt={'32px'}><Spinner /></Center>}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          columnGap: '15px',
          rowGap: '15px',
          width: '100%',
          paddingBottom: '20px'
        }}
        useWindow
      >
        {state.heroesToDisplay.map((id: number) => {
          const heroesMapElement = state.heroesMap[id];
          console.log(heroesMapElement, id);

          return <HeroBasicInfo key={id} {...heroesMapElement} />;
        })}
        {state.heroesToDisplay.length === 0 && <EmptyList />}
      </InfiniteScroll>
    </Flex>
  );
};
