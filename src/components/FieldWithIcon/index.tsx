import React, { FC } from 'react';
import cx from 'classnames';
import { Icon, Text } from 'components';
import styles from './styles.module.scss';

type Props = {
  icon: string
  text: string | number
  className?: string
};

const FieldWithIcon: FC<Props> = ({
  icon,
  text,
  className,
}) => (
  <div className={cx(styles.fieldWithIcon, className)}>
    <div className={styles.square}>
      <Icon icon={icon} />
    </div>
    <Text tag="span" color="gray" className={styles.text}>{text}</Text>
  </div>
);

export default FieldWithIcon;
