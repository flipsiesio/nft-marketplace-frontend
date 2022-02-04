import React, {
  FC,
  PropsWithChildren,
  CSSProperties,
  MouseEvent,
} from 'react';
import cx from 'classnames';
import { Icon } from 'components';
import styles from './styles.module.scss';

type Props = {
  type?: 'submit' | 'button',
  theme?: 'primary' | 'play' | 'success' | 'blue',
  size?: 'small' | 'medium' | 'big' | 'tiny',
  disabled?: boolean,
  bold?: boolean,
  use?: 'default' | 'rounded',
  icon?: string,
  style?: CSSProperties,
  className?: string,
  classNameIcon?: string,
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void,
};

const Button: FC<PropsWithChildren<Props>> = ({
  type = 'button',
  theme = 'primary',
  size = 'medium',
  disabled = false,
  bold = false,
  use = 'default',
  children,
  icon = '',
  style = {},
  className,
  classNameIcon,
  onClick = () => {},
}) => (
  // eslint-disable-next-line react/button-has-type
  <button
    type={type}
    disabled={disabled}
    className={cx(
      styles.btn,
      className,
      styles[theme],
      styles[size],
      styles[use],
      {
        [styles.disabled]: disabled,
        [styles.boldText]: bold,
        [styles.withIcon]: icon?.length,
      },
    )}
    style={style}
    onClick={onClick}
  >
    {icon && <Icon icon={icon} className={cx(styles.icon, classNameIcon)} />}
    {children}
  </button>
);

export default Button;
