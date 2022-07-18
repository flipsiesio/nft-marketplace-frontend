import React, { FC } from 'react';
import cx from 'classnames';
import { Text } from '../Typography';
import Icon from '../Icon';
import styles from './styles.module.scss';

type Props = {
  label?: string
  className?: string
  labelWrapClassName?: string
  isActive?: boolean
  onToggle: () => void
};

const Dropdown: FC<Props> = ({
  children,
  label,
  className,
  onToggle,
  isActive,
  labelWrapClassName,
}) => (
  <div className={className}>
    <div className={cx(styles.label_wrap, labelWrapClassName)}>
      <Text className={styles.label}>{label}</Text>
      <button type="button" onClick={onToggle}>
        <Icon
          className={cx(
            styles.arrow,
            { [styles.activeArrow]: isActive },
          )}
          icon="chevron"
        />
      </button>
    </div>
    {isActive && (
      children
    )}
  </div>
);

export { Dropdown };
