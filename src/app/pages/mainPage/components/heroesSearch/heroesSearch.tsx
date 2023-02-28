import React, { ChangeEvent } from 'react';

import { Input } from '@chakra-ui/react';
import debounce from 'lodash.debounce';
import { useHeroes } from 'src/hooks/useHeroes';

export const HeroesSearch: React.FC = () => {
  const { fetchHeroesByName } = useHeroes();
  const debouncedSearch = debounce(async (searchText: string) => {
    fetchHeroesByName(searchText);
  }, 300);

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  return (
    <Input
      w={'50vw'}
      alignSelf={'center'}
      placeholder={'Search hero by name'}
      onChange={onSearch}
    />
  );
};
