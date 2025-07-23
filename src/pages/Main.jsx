import Card from '@/components/RestaurantCard';
import { Box, Center, Flex, Grid, Heading, Input, InputGroup } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';

function Main({ label }) {
  return (
    <Center>
      <Box width="75%" py="10">
        <Flex direction="column" gap="12">
          <Flex direction="column" gap="4">
            <Heading size="3xl">{label === 'home' ? 'All Restaurants' : 'My Favorites'}</Heading>
            {label === 'home' && (
              <InputGroup startElement={<LuSearch color="#9E8747" />}>
                <Input
                  variant="subtle"
                  bg="#F4F0E6"
                  _placeholder={{ color: '#9E8747' }}
                  placeholder="search for restaurants"
                />
              </InputGroup>
            )}
          </Flex>

          <Grid templateColumns="repeat(3, 1fr)" gap="4">
            <Card label={label} />
            <Card label={label} />
            <Card label={label} />
            <Card label={label} />
            <Card label={label} />
            <Card label={label} />
            <Card label={label} />
            <Card label={label} />
          </Grid>
        </Flex>
      </Box>
    </Center>
  );
}

export default Main;
