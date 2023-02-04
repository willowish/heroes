import React, { useEffect } from 'react';

import { Box, Center, Spinner } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroller';
import { HeroBasicInfo } from 'src/app/pages/mainPage/components/heroBasicInfo/heroBasicInfo';
import { useHeroes } from 'src/hooks/useHeroes';
import { Hero } from 'src/model/hero.model';
import { LoadingStatus } from 'src/model/loadingStatus.enum';

const MainPage: React.FC = () => {
  const { fetchHeroes, state } = useHeroes();

  useEffect(() => {
    fetchHeroes();
  }, []);

  const fetchNextPage = () => {
    fetchHeroes(state.currentPage + 1);
  }

  if (state.status === LoadingStatus.LOADING || state.status === LoadingStatus.IDLE) {
    return <Center><Spinner /></Center>;
  }

  if (state.status === LoadingStatus.ERROR) {
    return <Center>Something went wrong</Center>;
  }

  const hasMore = state.totalElements > state.heroes.length;

  return (
    <Box p={5}>
        <InfiniteScroll
          pageStart={1}
          loadMore={fetchNextPage}
          hasMore={hasMore}
          loader={<Center w={'100%'} mt={'32px'}><Spinner/></Center>}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            columnGap: '15px',
            rowGap: '15px',
            width: '100%',
            paddingLeft: '1px',
            paddingRight: '1px',
            paddingBottom: '20px',
          }}
          useWindow
        >
            {state.heroes.map((hero: Hero) => <HeroBasicInfo key={hero.id} {...hero} />)}
        </InfiniteScroll>
    </Box>
  );
};

export default MainPage;
