import { toaster } from '@/components/ui/toaster';

export function showToaster({ description = '', type = 'info' }) {
  toaster.create({
    description: description,
    type: type,
    duration: 4000,
    isClosable: true,
  });
}
