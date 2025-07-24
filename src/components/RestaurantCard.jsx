import { Button, Card, Dialog, Flex, Image, useDialog, useDisclosure } from '@chakra-ui/react';
import { IoMdHeart } from 'react-icons/io';
import { IoMdHeartDislike } from 'react-icons/io';
import ConfirmDialog from './ConfirmDialog';

function RestaurantCard({ id, title, image, label, handleFavoriteAdd, handleFavoriteRemove }) {
  const dialog = useDialog();

  return (
    <>
      <Card.Root>
        <Flex direction="column" align="center">
          <Image aspectRatio={4 / 3} src={`http://localhost:3000/${image.src}`} alt={image.alt} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
          </Card.Body>
          <Card.Footer>
            {label === 'home' ? (
              <Button
                colorPalette="yellow"
                variants="surface"
                onClick={() => handleFavoriteAdd(id)}
              >
                <IoMdHeart />
                Add Favorites
              </Button>
            ) : (
              <Dialog.RootProvider value={dialog} role="alertdialog">
                <Dialog.Trigger asChild>
                  <Button colorPalette="red" variants="surface">
                    <IoMdHeartDislike />
                    Remove
                  </Button>
                </Dialog.Trigger>
                <ConfirmDialog
                  dialog={dialog}
                  onConfirm={() => handleFavoriteRemove(id)}
                  title="정말 삭제하시겠습니까?"
                >
                  Favorites 목록에서 맛집이 삭제됩니다.
                </ConfirmDialog>
              </Dialog.RootProvider>
            )}
          </Card.Footer>
        </Flex>
      </Card.Root>
    </>
  );
}

export default RestaurantCard;
