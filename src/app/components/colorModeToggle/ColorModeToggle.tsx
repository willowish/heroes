import React from 'react';

import { ButtonProps } from '@chakra-ui/button/dist/button';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { Button, useColorMode } from '@chakra-ui/react';

export const ColorModeToggle: React.FC<ButtonProps> = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      {...props}
      onClick={toggleColorMode}
    >
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};
