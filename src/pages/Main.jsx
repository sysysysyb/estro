import RestaurantCard from '@/components/RestaurantCard';
import {
  Box,
  Center,
  EmptyState,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  ProgressCircle,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import { IoMdRestaurant } from 'react-icons/io';

function Main({ label }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (label === 'home') {
      const fetchAllPlaces = async () => {
        try {
          setLoading(true);
          const response = await axios.get('http://localhost:3000/places');
          setPlaces(response.data.places);
        } catch (err) {
          console.error('전체 데이터 로드 실패', err);
        } finally {
          setLoading(false);
        }
      };
      fetchAllPlaces();
    } else {
      const fetchFavoritesPlaces = async () => {
        try {
          setLoading(true);
          const response = await axios.get('http://localhost:3000/users/places');
          setPlaces(response.data);
        } catch (err) {
          console.error('좋아요 데이터 로드 실패', err);
        } finally {
          setLoading(false);
        }
        fetchFavoritesPlaces();
      };
    }
  }, [label]);

  console.log(places);

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
          {loading ? (
            <Center>
              <ProgressCircle.Root value={null} size="md">
                <ProgressCircle.Circle>
                  <ProgressCircle.Track />
                  <ProgressCircle.Range />
                </ProgressCircle.Circle>
              </ProgressCircle.Root>
            </Center>
          ) : places.length > 0 ? (
            <Grid templateColumns="repeat(3, 1fr)" gap="4">
              {places.map(({ id, title, image }) => (
                <RestaurantCard key={id} title={title} image={image} label={label} />
              ))}
            </Grid>
          ) : (
            <EmptyState.Root size="lg">
              <EmptyState.Content>
                <EmptyState.Indicator>
                  <IoMdRestaurant />
                </EmptyState.Indicator>
                <EmptyState.Title>{label} is empty</EmptyState.Title>
                <EmptyState.Description>
                  Add new places into your favorite places list
                </EmptyState.Description>
              </EmptyState.Content>
            </EmptyState.Root>
          )}
        </Flex>
      </Box>
    </Center>
  );
}

export default Main;
