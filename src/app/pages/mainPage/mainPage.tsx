import React, { useEffect } from 'react';

import { Box, Center, Spinner } from '@chakra-ui/react';
import { HeroesList } from 'src/app/pages/mainPage/components/heroesList/heroesList';
import { useHeroes } from 'src/hooks/useHeroes';
import { LoadingStatus } from 'src/model/loadingStatus.enum';

const MainPage: React.FC = () => {
  const { fetchHeroes, state } = useHeroes();

  useEffect(() => {
    fetchHeroes();
  }, []);

  if (state.status === LoadingStatus.LOADING) {
    return <Center><Spinner /></Center>;
  }

  if (state.status === LoadingStatus.ERROR && !state.heroesToDisplay.length) {
    return <Center>Something went wrong</Center>;
  }

  return (
    <Box p={5}>
      {/*<RandomHeroes />*/}
      <HeroesList />
    </Box>
  );
};

export default MainPage;
