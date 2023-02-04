import { useContext } from 'react';

import { HeroesContext } from 'src/hooks/HeroesContext';

export const useHeroes = () => useContext(HeroesContext);
