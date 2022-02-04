import React, { FC, CSSProperties } from 'react';
import cx from 'classnames';

type Props = {
  icon: string,
  className?: string,
  style?: CSSProperties,
};

const Icon: FC<Props> = ({ icon, className, style = {} }) => (
  <i className={cx(`icon-${icon}`, className)} style={style} />
);

export default Icon;
