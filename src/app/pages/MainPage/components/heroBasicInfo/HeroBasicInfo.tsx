import React from 'react';

import { Card, CardBody, Heading, Text } from '@chakra-ui/react';
import { Hero } from 'src/app/model/hero.model';
import { Routes } from 'src/config/routes';
import { getEndpointWithId } from 'src/utils/getEndpointWIthId';
import { useLocation } from 'wouter';

export type HeroBasicInfoProps = Pick<Hero, 'id' | 'name' | 'biography'>;
export const HeroBasicInfo: React.FC<HeroBasicInfoProps> = ({ id, name, biography }) => {
  const [, setLocation] = useLocation();

  const redirectToDetails = () => {
    setLocation(getEndpointWithId(Routes.hero, id));
  };
  return (
    <Card w={'320px'} cursor={'pointer'} onClick={redirectToDetails}>
      <CardBody>
        <Heading as='h3' size='lg'>{name}</Heading>
        <Text fontWeight='bold'>Full Name:</Text>
        <Text>{biography.fullName}</Text>
        <Text fontWeight='bold'>Aliases:</Text>
        <Text>{biography.aliases.join(', ')}</Text>
        <Text fontWeight='bold'>Alignment:</Text>
        <Text>{biography.alignment}</Text>
      </CardBody>
    </Card>
  );
};

