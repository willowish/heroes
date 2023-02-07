import React, { useMemo } from 'react';

import { Flex, Stack, Text } from '@chakra-ui/react';
import { HeroBasicInfo } from 'src/app/pages/mainPage/components/heroBasicInfo/heroBasicInfo';
import { useHeroes } from 'src/hooks/useHeroes';
import { Hero } from 'src/model/hero.model';

export const RandomHeroes: React.FC = () => {
  const { state: { heroes, totalElements } } = useHeroes();
  const getRandomIndexes = (n: number, min: number, max: number): number[] => {
    const result = new Set<number>();
    while (result.size < n) {
      result.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return Array.from(result);
  };

  const randomHeroes: Hero[] = useMemo(() => {
    const randomIndexes = getRandomIndexes(3, 0, heroes.length - 1);
    return randomIndexes.map(index => heroes[index]);
  },[]);

  return (
    <Stack mb={'24px'}>
      <Text textAlign={'center'} fontSize='4xl'>Featured Heroes:</Text>
      <Flex wrap={'wrap'} justifyContent={'center'} gap={'16px'}>
        {randomHeroes.map((hero) => {
          return <HeroBasicInfo {...hero} key={hero.id} />;
        })}
      </Flex>
    </Stack>
  );
};
