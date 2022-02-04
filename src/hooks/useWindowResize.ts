import { useEffect } from 'react';

type Params = () => void;

export default (handleResize: Params) => {
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};
