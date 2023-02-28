import React from 'react';

import { Center, Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import { HeroBasicInfo } from 'src/app/pages/mainPage/components/heroBasicInfo/heroBasicInfo';
import { useRandomHeroes } from 'src/app/pages/mainPage/components/randomHeroes/useRandomHeroes';

export const RandomHeroes: React.FC = () => {
  const { loading, heroes} = useRandomHeroes();

  const Content = () => {
    if (loading) {
      return <Center><Spinner size={'xl'} /></Center>;
    }
    console.log(heroes);
    return (
      <Flex wrap={'wrap'} justifyContent={'center'} gap={'16px'}>
        {heroes.map((hero) => {
          return <HeroBasicInfo {...hero} key={hero.id}
          />;
        })}
      </Flex>
    );
  }


  return (
    <Stack mb={'24px'}>
      <Text textAlign={'center'} fontSize='4xl'>Featured Heroes:</Text>
      {Content()}
    </Stack>
  );
};
