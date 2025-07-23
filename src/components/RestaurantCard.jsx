import { Box, Button, ButtonGroup, Card, Flex, Image } from '@chakra-ui/react';
import { IoMdHeart } from 'react-icons/io';
import { IoMdHeartDislike } from 'react-icons/io';

function RestaurantCard({ label }) {
  return (
    <Card.Root>
      <Flex direction="column" align="center">
        <Image
          src="https://cdn.pixabay.com/photo/2021/07/20/06/04/restaurant-6479818_960_720.jpg"
          alt="example"
        />
        <Card.Body>
          <Card.Title>Example Restaurant</Card.Title>
        </Card.Body>
        <Card.Footer>
          {label === 'home' ? (
            <Button colorPalette="yellow" variants="surface">
              <IoMdHeart />
              Add Favorites
            </Button>
          ) : (
            <Button colorPalette="red" variants="surface">
              <IoMdHeartDislike />
              Remove
            </Button>
          )}
        </Card.Footer>
      </Flex>
    </Card.Root>
  );
}

export default RestaurantCard;
