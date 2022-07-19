import React, { FC } from 'react';
import { Text } from 'components';
import cx from 'classnames';
import styles from './styles.module.scss';

type Props = {
  head: string
  value: string
  percent: string
  className?: string
};

const ProfileAttribute: FC<Props> = ({
  head,
  value,
  percent,
  className,
}) => (
  <div className={cx(styles.wrap, className)}>
    <Text className={styles.head}>{head}</Text>
    <Text title={value} className={styles.value}>{value.split(' ').map((text) => (
      <>
        {text}
        <br />
      </>
    ))}
    </Text>
    <Text className={styles.percent}>{percent}</Text>
  </div>
);

export { ProfileAttribute };
