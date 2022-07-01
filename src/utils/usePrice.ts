import {
  ChangeEventHandler, useCallback, useMemo, useState,
} from 'react';

export const usePrice = () => {
  const [value, setValue] = useState<string>('');

  const changeHandler = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setValue(e.target.value);
  }, []);

  const hasError = useMemo(() => {
    if (value.length === 0) return true;

    const reg = /([0-9]*[.])?[0-9]+/;
    const execValue = reg.exec(value);
    if (execValue === null) return true;
    if (value.length !== execValue[0].length) return true;

    const valueAfterPoint = value.split('.')[1];
    if (valueAfterPoint && valueAfterPoint.length > 6) return true;

    return false;
  }, [value]);

  return {
    changeHandler,
    hasError,
    value,
  };
};
