import React, { FC, useCallback } from 'react';
import cx from 'classnames';
import avatar from 'assets/img/avatar.svg';
import dealerAvatar from 'assets/img/avatar-dealer.svg';
import styles from './styles.module.scss';

type Props = {
  type?: 'player' | 'dealer',
  className?: string,
};

const Avatar: FC<Props> = ({
  type = 'player',
  className,
}) => {
  const getAvatar = useCallback((): string => {
    return type === 'player' ? avatar : dealerAvatar;
  }, [type]);

  return (
    <div
      className={cx(
        styles.square,
        className,
      )}
    >
      <img src={getAvatar()} className={styles.image} alt="Avatar" />
    </div>
  );
};

export default Avatar;
