import { useCallback, useState } from 'react';

export const useToggle = (initialState = false) => {
  const [isActive, setActive] = useState(initialState);

  const onToggle = useCallback(() => {
    setActive((prevState) => !prevState);
  }, []);

  return {
    isActive,
    onToggle,
    setActive,
  };
};
