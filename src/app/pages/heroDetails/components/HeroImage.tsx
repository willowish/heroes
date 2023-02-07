import React from 'react';

import { Hero } from 'src/model/hero.model';

type Props = Pick<Hero, 'images'>;
export const HeroImage: React.FC<Props> = ({ images }) => {
  return (
    <picture>
      <source srcSet={images.sm} media='(max-width: 900px)' />
      <source srcSet={images.md} media='(max-width: 1200px)' />
      <source srcSet={images.lg} media='(max-width: 1800px)' />
      <img src={images.xs} alt={'hero image'} />
    </picture>
  );
};
