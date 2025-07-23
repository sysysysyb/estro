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
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import { IoMdRestaurant } from 'react-icons/io';
import { getAllPlaces, getFavoritesPlaces } from '@/apis';

function Main({ label }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (label === 'home') {
      const fetchAllPlaces = async () => {
        try {
          setLoading(true);
          const data = await getAllPlaces();
          setPlaces(data);
          setError(null);
        } catch (error) {
          setError(error);
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
          const data = await getFavoritesPlaces();
          setPlaces(data);
          setError(null);
        } catch (error) {
          setError(error);
          console.error('좋아요 데이터 로드 실패', err);
        } finally {
          setLoading(false);
        }
      };
      fetchFavoritesPlaces();
    }
  }, [label]);

  console.log(places);

  if (error)
    return (
      <Flex justify="center" align="center" w="100%" h="100%">
        <Box width="50%" colorPalette="red" bg="colorPalette.300" p="10" textAlign="center">
          <Flex direction="column" gap="5">
            <Heading>❌ Error 발생!</Heading>
            <Flex direction="column" gap="2">
              <Text>에러 코드 : {error.status}</Text>
              <Text>에러 메시지 : {error.data.message}</Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    );

  return (
    <Center>
      <Box w="75%" py="10">
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
