import { Box, Flex, Heading } from '@chakra-ui/react'
import { ColorModeToggle } from 'src/app/components/colorModeToggle/ColorModeToggle';

export const Navbar = () => {
  return (
    <Box p={4} shadow={'sm'}>
      <Flex>
        <Heading>Heroes</Heading>
        <ColorModeToggle ml="auto"/>
      </Flex>
    </Box>
  )
}
