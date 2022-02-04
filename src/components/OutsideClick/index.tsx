import {
  createElement,
  useRef,
  useEffect,
  FC,
  PropsWithChildren,
  CSSProperties,
} from 'react';

type Tag = 'div' | 'button' | 'section' | 'nav' | 'header';

type Props = {
  className?: string,
  style?: CSSProperties,
  tag?: Tag,
  onClick: () => void,
};

const OutsideClick: FC<PropsWithChildren<Props>> = ({
  className,
  style = {},
  tag = 'div',
  children,
  onClick = () => {},
}) => {
  const wrapperRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // @ts-ignore
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClick();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [children]);

  return createElement(tag, {
    ref: wrapperRef,
    className,
    style,
  }, children);
};

export default OutsideClick;
