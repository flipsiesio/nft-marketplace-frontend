import { useState, useEffect } from 'react';

type WindowDimensions = {
  innerWidth: number,
  innerHeight: number,
};

function getWindowDimensions() {
  const { innerWidth, innerHeight }: WindowDimensions = window;
  return {
    innerWidth,
    innerHeight,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
