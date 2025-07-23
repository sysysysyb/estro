import { Box, Button, Card, Flex, Image } from '@chakra-ui/react';
import { IoMdHeart } from 'react-icons/io';

function RestaurantCard() {
  return (
    <Card.Root colorPalette="yellow">
      <Flex direction="column" align="center">
        <Image
          src="https://cdn.pixabay.com/photo/2021/07/20/06/04/restaurant-6479818_960_720.jpg"
          alt="example"
        />
        <Card.Body>
          <Card.Title>Example Restaurant</Card.Title>
        </Card.Body>
        <Card.Footer>
          <Button variants="surface">
            <IoMdHeart />
            Add Favorites
          </Button>
        </Card.Footer>
      </Flex>
    </Card.Root>
  );
}

export default RestaurantCard;
