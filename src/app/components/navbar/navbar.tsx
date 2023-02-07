import { Box, Flex, Heading } from '@chakra-ui/react';
import { ColorModeToggle } from 'src/app/components/colorModeToggle/ColorModeToggle';
import { Routes } from 'src/config/routes';
import { Link } from 'wouter';

export const Navbar = () => {
  return (
    <Box p={4} shadow={'sm'}>
      <Flex>
        <Link href={Routes.home}><Heading cursor={'pointer'}>Heroes</Heading></Link>
        <ColorModeToggle ml='auto' />
      </Flex>
    </Box>
  );
};
