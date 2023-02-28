import React, { useEffect, useState } from 'react';

import { Center, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { HeroImage } from 'src/app/pages/heroDetails/components/HeroImage';
import { HeroNestedSection } from 'src/app/pages/heroDetails/components/heroNestedSection/heroNestedSection';
import { Routes } from 'src/config/routes';
import { theme } from 'src/config/theme';
import { useHeroes } from 'src/hooks/useHeroes';
import { Hero } from 'src/model/hero.model';
import { useRoute } from 'wouter';

const HeroDetails: React.FC = () => {
  const { fetchHeroById } = useHeroes();
  const [, params] = useRoute(Routes.hero);
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const heroId = params?.id ? Number(params.id) : null;
    if (heroId) {
      fetchHeroById(heroId).then((fetchedHero) => {
        setHero(fetchedHero);
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [params?.id]);

  if (!loading && !hero) {
    return <Center><Heading>Hero not found :/</Heading></Center>;
  }

  if (!hero) {
    return <Spinner />;
  }

  const fieldToComponent = (field: keyof Hero, hero: Hero) => {
    const isTextBasedField =
      typeof hero[field] === 'string'
      || typeof hero[field] === 'number'
      || typeof hero[field] === 'boolean';
    if (isTextBasedField) {
      return (
        <Flex gap={'5px'}>
          <Text fontWeight={'bold'}>
            <strong>{field}: </strong>
          </Text>
          <Text>
            {hero[field] as string | number | boolean}
          </Text>
        </Flex>
      );
    }
    if (field === 'images') {
      return <HeroImage images={hero.images} />;
    }
    return <HeroNestedSection
      fields={hero[field] as Record<string, string | number | string[]>}
      sectionName={field} heroId={hero.id}
    />;
  };

  return (
    <Flex direction={'column'} gap={theme} padding={'12px 24px'}>
      {Object
        .entries(hero)
        .map(([key, value]) => {
          return (
            <Flex key={key}>
              {fieldToComponent(key as keyof Hero, hero)}
            </Flex>
          );
        })}
    </Flex>
  );
};

export default HeroDetails;
