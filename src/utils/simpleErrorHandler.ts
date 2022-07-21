import { toast } from 'react-toastify';

type ErrorWithError = {
  error: string
};

function instanceOfErrorWithError(object: unknown): object is ErrorWithError {
  if (typeof object === 'object') {
    return 'error' in (object as ErrorWithError);
  }

  return false;
}

export const simpleErrorHandler = (err: unknown) => {
  if (typeof err === 'string') {
    toast.error(err);
  }

  if (instanceOfErrorWithError(err)) {
    toast.error(`${err.error}. Please refresh page`);
  }
};
