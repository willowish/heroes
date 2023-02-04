import React from 'react';

import { render, screen } from '@testing-library/react';
import { HeroBasicInfo, HeroBasicInfoProps } from 'src/app/pages/mainPage/components/heroBasicInfo/heroBasicInfo';
import '@testing-library/jest-dom';

describe('HeroBasicInfo', () => {
  it('should render hero basic info', () => {
    const hero: HeroBasicInfoProps = {
      id: 1,
      name: 'Batman',
      biography: {
        fullName: 'Bruce Wayne',
        aliases: ['Batman', 'The Dark Knight'],
        alignment: 'good',
        alterEgos: 'Bruce Wayne',
        firstAppearance: 'Detective Comics #27',
        placeOfBirth: 'Crest Hill, Bristol Township; Gotham County',
        publisher: 'DC Comics',
      }
    };

    render(<HeroBasicInfo {...hero} />);

    expect(screen.getByText(hero.name)).toBeInTheDocument();
    expect(screen.getByText(hero.biography.fullName)).toBeInTheDocument();
    expect(screen.getByText(hero.biography.aliases.join(', '))).toBeInTheDocument();
    expect(screen.getByText(hero.biography.alignment)).toBeInTheDocument();
  });

  it('should redirect to hero details page', () => {
    const hero: HeroBasicInfoProps = {
      id: 1,
      name: 'Batman',
      biography: {
        fullName: 'Bruce Wayne',
        aliases: ['Batman', 'The Dark Knight'],
        alignment: 'good',
        alterEgos: 'Bruce Wayne',
        firstAppearance: 'Detective Comics #27',
        placeOfBirth: 'Crest Hill, Bristol Township; Gotham County',
        publisher: 'DC Comics',
      }
    };
    render(<HeroBasicInfo {...hero} />);

    expect(screen.getByText(hero.name)).toBeInTheDocument();
    expect(screen.getByText(hero.biography.fullName)).toBeInTheDocument();
    expect(screen.getByText(hero.biography.aliases.join(', '))).toBeInTheDocument();
    expect(screen.getByText(hero.biography.alignment)).toBeInTheDocument();
  });
});
