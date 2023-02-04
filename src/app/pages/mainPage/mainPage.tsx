import React, { useEffect } from 'react';

import { Box, Center, Flex, Spinner } from '@chakra-ui/react';
import { HeroBasicInfo } from 'src/app/pages/mainPage/components/heroBasicInfo/heroBasicInfo';
import { useHeroes } from 'src/hooks/useHeroes';
import { Hero } from 'src/model/hero.model';
import { LoadingStatus } from 'src/model/loadingStatus.enum';

const MainPage: React.FC = () => {
  const { fetchHeroes, state } = useHeroes();

  useEffect(() => {
    fetchHeroes();
  }, []);

  if (state.status === LoadingStatus.LOADING || state.status === LoadingStatus.IDLE) {
    return <Center><Spinner /></Center>;
  }

  if (state.status === LoadingStatus.ERROR) {
    return <Center>Something went wrong</Center>;
  }


  return (
    <Box p={5}>
      <Center>
        <Flex wrap={'wrap'} gap={'16px'} justifyContent={'center'}>
          {state.heroes.map((hero: Hero) => <HeroBasicInfo key={hero.id} {...hero} />)}
        </Flex>
      </Center>
    </Box>
  );
};

export default MainPage;
