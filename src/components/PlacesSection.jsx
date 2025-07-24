import RestaurantCard from '@/components/RestaurantCard';
import {
  Box,
  Center,
  EmptyState,
  Flex,
  Grid,
  Heading,
  ProgressCircle,
  Text,
} from '@chakra-ui/react';
import { IoMdRestaurant } from 'react-icons/io';
import { addFavoritesPlace } from '@/apis';
import { showToaster } from '@/utils/showToaster';

function PlacesSection({ placesData, label, loading, error, handleFavoriteRemove }) {
  const handleFavoriteAdd = async (favId) => {
    try {
      const favPlace = placesData.find((el) => el.id === favId);
      console.log(favPlace);
      const data = await addFavoritesPlace(favPlace);
      console.log(data);
      showToaster({ description: 'Favorites에 맛집 저장하기 성공 😆', type: 'success' });
    } catch (error) {
      console.error('Favorites 저장 실패', error);
      showToaster({ description: 'Favorites 저장 실패 🙄', type: 'error' });
    }
  };

  if (error) {
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
  }

  if (loading) {
    return (
      <Center>
        <ProgressCircle.Root value={null} size="md">
          <ProgressCircle.Circle>
            <ProgressCircle.Track />
            <ProgressCircle.Range />
          </ProgressCircle.Circle>
        </ProgressCircle.Root>
      </Center>
    );
  }

  if (placesData.length === 0) {
    return (
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
    );
  }

  console.log('placesData : ', placesData);
  // console.log('filteredData : ', filteredData);

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap="4">
      {placesData.map(({ id, title, image }) => (
        <RestaurantCard
          key={id}
          id={id}
          title={title}
          image={image}
          label={label}
          handleFavoriteAdd={handleFavoriteAdd}
          handleFavoriteRemove={handleFavoriteRemove}
        />
      ))}
    </Grid>
  );
}

export default PlacesSection;
