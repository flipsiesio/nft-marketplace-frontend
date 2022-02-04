import React, { FC } from 'react';
import { Avatar, H3, Copy } from 'components';
import { useShallowSelector } from 'hooks';
import { tronSelector } from 'store/selectors';
import ProfileNav from './ProfileNav';
import ProfileInfo from './ProfileInfo';
import styles from './styles.module.scss';

type Props = {
  isInfoVisible?: boolean,
};

const Profile: FC<Props> = ({ isInfoVisible = true }) => {
  const { name, address } = useShallowSelector(tronSelector.getState);
  return (
    <>
      <div className={styles.header}>
        <Avatar
          className={styles.avatar}
        />
        <div>
          <H3 className={styles.name}>{name}</H3>
          {address && <Copy value={address} className={styles.copy} />}
        </div>
      </div>

      <ProfileNav />
      {isInfoVisible && <ProfileInfo />}
    </>
  );
};

export default Profile;
