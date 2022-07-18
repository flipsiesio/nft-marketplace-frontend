import { toast } from 'react-toastify';

export const simpleErrorHandler = (err: unknown) => {
  if (typeof err === 'string') {
    toast.error(err);
  }
};
