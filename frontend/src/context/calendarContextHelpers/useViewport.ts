import { useEffect, useState } from 'react';

interface UseViewPortArgs {
  onWidthChange?: (w: number) => void;
  onHeightChange?: (w: number) => void;
}

export default function useViewport({ onWidthChange, onHeightChange }: UseViewPortArgs) {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => onWidthChange?.(width), [width, onWidthChange]);
  useEffect(() => onHeightChange?.(height), [height, onHeightChange]);

  return { width, height };
}
