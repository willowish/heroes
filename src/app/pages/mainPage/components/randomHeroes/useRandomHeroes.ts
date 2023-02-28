import { useEffect, useState } from 'react';

import { useHeroes } from 'src/hooks/useHeroes';
import { Hero } from 'src/model/hero.model';
import { getRandomNumberInRange } from 'src/utils/getRandomNumberInRange';

export const useRandomHeroes = () => {
  const { fetchHeroById, state: { totalElements } } = useHeroes();
  const [randomHeroes, setRandomHeroes] = useState<{ loading: boolean; heroes: Hero[] }>(
    { loading: true, heroes: [] }
  );

  useEffect(() => {
    const getRandomHeroes = async () => {
      const randomHeroes: Hero[] = [];
      for (let i = 0; i < 3; i++) {
        const randomId = getRandomNumberInRange(totalElements);
        console.log(randomId);

        const randomHero = await fetchHeroById(randomId);
        if(!randomHero) {
          i--;
        }else  {
          randomHeroes.push(randomHero);
        }
      }
      setRandomHeroes({ loading: false, heroes: randomHeroes });
    };

    getRandomHeroes();
  }, []);


  return randomHeroes;
};
