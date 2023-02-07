import React from 'react';

import { Flex, Text } from '@chakra-ui/react';


type Props = {
  fields: Record<string, string | number | string[]>;
  sectionName: string;
  heroId: number;
};
export const HeroNestedSection: React.FC<Props> = (
  { fields, sectionName, heroId }
) => {
  const getFieldValue = (text: string | number | string[]): string | number => {
    if (Array.isArray(text)) {
      return text.join(' / ');
    }
    return text;
  };

  const getFiledTitle = (key: string): string => key.replace(/([A-Z])/g, ' $1');

  return (
    <Flex flexDir={'column'} gap={'5px'}>
      {Object
        .entries(fields)
        .map(([key, value]) => (
          <Text
            key={`${heroId}__${key}`}
            casing={'capitalize'}
          >
            <strong>{getFiledTitle(key)}</strong>: {getFieldValue(value)}
          </Text>
        ))}
    </Flex>
  );
};
