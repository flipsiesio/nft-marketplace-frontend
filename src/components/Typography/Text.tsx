import { FC, PropsWithChildren, createElement } from 'react';
import cx from 'classnames';
import {
  TextAlign as Align,
  TextColor as Color,
  TextSize as Size,
} from 'types';

import styles from './styles.module.scss';

type Tag = 'p' | 'span' | 'div';
type Props = {
  tag?: Tag,
  className?: string,
  underline?: boolean,
  style?: { [key: string]: string | number },
  size?: Size,
  color?: Color,
  align?: Align;
  bold?: boolean,
};

const Text: FC<PropsWithChildren<Props>> = ({
  tag = 'p',
  children,
  className,
  style = { },
  size = 'normal',
  color = 'dark',
  align = 'left',
  underline = false,
  bold = false,
}) => (
  createElement(
    tag,
    {
      style,
      className: cx(
        styles.p,
        styles[size],
        styles[color],
        styles[align],
        {
          [styles.bold]: bold,
          [styles.underline]: underline,
        },
        className,
      ),
    },
    children,
  )
);

export default Text;
