import { Box, Flex } from '@chakra-ui/react';
import Header from '@components/Header';
import { Outlet } from 'react-router';

function Layout() {
  return (
    <Flex direction="column" bg="#FCFBF8" h="100vh">
      <Header />
      <Box flex={1}>
        <Outlet />
      </Box>
      {/* Footer */}
    </Flex>
  );
}

export default Layout;
