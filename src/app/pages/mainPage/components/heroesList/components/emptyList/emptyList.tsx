import React from 'react';

import { Heading } from '@chakra-ui/react';

export const EmptyList: React.FC = () => {
  return (
    <Heading mt={'24px'} opacity={'0.5'}>Nothing to display</Heading>
  )
};
