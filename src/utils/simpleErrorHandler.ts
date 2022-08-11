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

type ErrorWithMessage = {
  message: string
};

function instanceOfErrorWithMessage(object: unknown): object is ErrorWithMessage {
  if (typeof object === 'object') {
    return 'message' in (object as ErrorWithMessage);
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

  if (instanceOfErrorWithMessage(err)) {
    toast.error(err.message);
  }
};
