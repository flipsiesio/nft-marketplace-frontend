import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Icon } from 'components';
import { routes } from 'appConstants';
import styles from './styles.module.scss';

const ProfileNav = () => {
  const { t } = useTranslation();
  const links = useMemo(() => [
    {
      id: 1,
      title: t('profile.referral'),
      icon: 'referral',
      to: routes.personal.referral.root,
    },
    {
      id: 2,
      title: t('profile.betsHistory'),
      icon: 'article',
      to: routes.personal.betsHistory.root,
    },
  ], [t]);
  return (
    <nav className={styles.nav}>
      {links.map((link) => (
        <NavLink
          key={link.id}
          to={link.to}
          activeClassName={styles.active}
          className={styles.link}
        >
          <Icon icon={link.icon} />
          {link.title}
        </NavLink>
      ))}
    </nav>
  );
};

export default ProfileNav;
