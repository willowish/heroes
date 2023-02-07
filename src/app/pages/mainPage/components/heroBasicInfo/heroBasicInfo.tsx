import React from 'react';

import { Card, CardBody, Heading, Text } from '@chakra-ui/react';
import { Routes } from 'src/config/routes';
import { Hero } from 'src/model/hero.model';
import { getEndpointWithId } from 'src/utils/getEndpointWIthId';
import { useLocation } from 'wouter';

export type HeroBasicInfoProps = Pick<Hero, 'id' | 'name' | 'biography'>;
export const HeroBasicInfo: React.FC<HeroBasicInfoProps> = ({ id, name, biography }) => {
  const [, setLocation] = useLocation();

  const redirectToDetails = () => {
    setLocation(getEndpointWithId(Routes.hero, id));
  };
  return (
    <Card w={'300px'} cursor={'pointer'} onClick={redirectToDetails}>
      <CardBody>
        <Heading as='h3' size='lg'>{name}</Heading>
        <Text fontWeight='bold'>Full Name:</Text>
        <Text>{biography.fullName}</Text>
        <Text fontWeight='bold'>Alter egos:</Text>
        <Text>{biography.alterEgos}</Text>
        <Text fontWeight='bold'>Alignment:</Text>
        <Text>{biography.alignment}</Text>
      </CardBody>
    </Card>
  );
};

