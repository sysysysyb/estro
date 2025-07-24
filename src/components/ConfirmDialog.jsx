import { Button, Dialog, Portal } from '@chakra-ui/react';

function ConfirmDialog({ dialog, onConfirm, title, children }) {
  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>{children}</Dialog.Body>
          <Dialog.Footer>
            <Button
              variant="outline"
              onClick={() => {
                dialog.setOpen(false);
              }}
            >
              취소
            </Button>
            <Button
              colorPalette="red"
              onClick={() => {
                onConfirm();
                dialog.setOpen(false);
              }}
              ml={3}
            >
              확인
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
}

export default ConfirmDialog;
