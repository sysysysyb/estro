import { Box } from '@chakra-ui/react';
import Header from '@components/Header';
import { Outlet } from 'react-router';

function Layout() {
  return (
    <Box bg="#FCFBF8" minHeight="100vh">
      <Header />
      <Outlet />
      {/* Footer */}
    </Box>
  );
}

export default Layout;
