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
import { useEffect, useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import { IoMdRestaurant } from 'react-icons/io';
import { getAllPlaces, getFavoritesPlaces } from '@/apis';
import { getCurrentPosition } from '@/utils/getCurrentPostion';
import { toaster } from '@/components/ui/toaster';
import { sortPlacesByDistance } from '@/utils/sortPlaces';

function Main({ label }) {
  const [places, setPlaces] = useState([]);
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        const data = label === 'home' ? await getAllPlaces() : await getFavoritesPlaces();
        setPlaces(data);
        setError(null);
      } catch (error) {
        setError(error);
        console.error('전체 데이터 로드 실패', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, [label]);

  useEffect(() => {
    if (label === 'home' && places) {
      getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      })
        .then((position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        })
        .catch((err) => {
          toaster.create({
            title: '위치 정보 로드 실패',
            description: err.message,
            type: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
    }
  }, [label, places]);

  const sortedPlaces = sortPlacesByDistance(places, coords.latitude, coords.longitude);

  // console.log(coords);
  // console.log(sortedPlaces);

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
          ) : sortedPlaces.length > 0 ? (
            <Grid templateColumns="repeat(3, 1fr)" gap="4">
              {sortedPlaces.map(({ id, title, image }) => (
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
