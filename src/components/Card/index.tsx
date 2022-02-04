import React, { FC, PropsWithChildren, CSSProperties } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

type Tag = 'section' | 'div' | 'article';

type Props = {
  tag?: Tag,
  id?: string,
  className?: string,
  style?: CSSProperties,
};

const Card: FC<PropsWithChildren<Props>> = ({
  tag = 'section',
  children,
  id = '',
  className,
  style = {},
}) => (
  React.createElement(
    tag,
    {
      className: cx(styles.card, className),
      style,
      id,
    },
    children,
  )
);

export default Card;
