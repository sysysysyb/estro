import { Button, Card, Flex, Image } from '@chakra-ui/react';
import { IoMdHeart } from 'react-icons/io';
import { IoMdHeartDislike } from 'react-icons/io';

function RestaurantCard({ id, title, image, label, handleFavoriteAdd, handleFavoriteRemove }) {
  return (
    <Card.Root>
      <Flex direction="column" align="center">
        <Image aspectRatio={4 / 3} src={`http://localhost:3000/${image.src}`} alt={image.alt} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
        <Card.Footer>
          {label === 'home' ? (
            <Button colorPalette="yellow" variants="surface" onClick={() => handleFavoriteAdd(id)}>
              <IoMdHeart />
              Add Favorites
            </Button>
          ) : (
            <Button colorPalette="red" variants="surface" onClick={() => handleFavoriteRemove(id)}>
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
