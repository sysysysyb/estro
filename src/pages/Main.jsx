import { Box, Center, Flex, Heading, Input, InputGroup } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import { getAllPlaces, getFavoritesPlaces } from '@/apis';
import { getCurrentPosition } from '@/utils/getCurrentPostion';
import { sortPlacesByDistance } from '@/utils/sortPlaces';
import { showToaster } from '@/utils/showToaster';
import PlacesSection from '@/components/PlacesSection';

function Main({ label }) {
  const [places, setPlaces] = useState([]);
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [sortedPlaces, setSortedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        if (label === 'home') {
          const data = await getAllPlaces();
          showToaster({ description: '맛집 데이터 불러오기 성공 😋', type: 'success' });
          setPlaces(data);
        } else {
          const data = await getFavoritesPlaces();
          showToaster({ description: '좋아요 데이터 불러오기 성공 😍', type: 'success' });
          console.log('favorites : ', data);
          setPlaces(data);
        }
        setError(null);
      } catch (error) {
        setError(error);
        console.error('맛집 데이터 로드 실패', error);
        showToaster({ description: '맛집 데이터 불러오기 실패 😥', type: 'error' });
        setLoading(false);
      }
    };
    fetchPlaces();
  }, [label]);

  useEffect(() => {
    if (label === 'home' && places.length > 0) {
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
          showToaster({ description: '위치 데이터 불러오기 성공 😎', type: 'success' });
        })
        .catch((err) => {
          setError(error);
          console.error('사용자 거리 로드 실패', err);
          showToaster({ description: '위치 데이터 불러오기 실패 🙁', type: 'error' });
          setLoading(false);
        });
    }
  }, [label, places]);

  useEffect(() => {
    if (coords.latitude && coords.longitude) {
      setSortedPlaces(sortPlacesByDistance(places, coords.latitude, coords.longitude));
    }
    setLoading(false);
  }, [coords.latitude, coords.longitude]);

  // console.log(places);
  // console.log(coords);
  console.log(sortedPlaces);

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
          <PlacesSection
            placesData={label === 'home' ? sortedPlaces : places}
            label={label}
            loading={loading}
            error={error}
          />
        </Flex>
      </Box>
    </Center>
  );
}

export default Main;
