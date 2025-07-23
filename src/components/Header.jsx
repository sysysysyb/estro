import { Avatar, Box, Flex, Heading, Link } from '@chakra-ui/react';

function Header() {
  return (
    <Box px="8" py="4" shadow="0 0 10px 2px #00000010">
      <Flex justify="space-between" align="center">
        <Flex gap="6">
          <Heading size="2xl">ESTRO</Heading>
          <Flex gap="3">
            <Link>Home</Link>
            <Link>Favorites</Link>
          </Flex>
        </Flex>
        <Avatar.Root>
          <Avatar.Fallback name="Seoyoung Baek" />
          <Avatar.Image src="https://cdn.pixabay.com/photo/2018/03/24/17/57/cat-3257338_1280.jpg" />
        </Avatar.Root>
      </Flex>
    </Box>
  );
}

export default Header;
