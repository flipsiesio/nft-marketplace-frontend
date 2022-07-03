import React from 'react';
import cx from 'classnames';
import { Icon } from 'components';
import styles from './styles.module.scss';

const LINKS = [
  {
    href: 'https://twitter.com/FlipsiesFlips',
    icon: 'twitter',
  },
  {
    href: 'https://www.facebook.com/Flipsies-102731458667871',
    icon: 'facebook',
  },
  {
    href: 'https://www.instagram.com/flipsies.io/?hl=en',
    icon: 'instagram',
  },
  {
    href: 'https://t.me/joinchat/Cq49Re4v0WE3ZGE1',
    icon: 'telegram',
  },
  {
    href: 'https://github.com/flipsiesio',
    icon: 'github',
    className: styles.github,
  },
  {
    href: 'https://t.co/5OIPpTaBVF',
    icon: 'discord',
    className: styles.discord,
  },
];

const FooterSocialLinks = () => (
  <div className={styles.list}>
    {LINKS.map(({ href, icon, className }) => (
      <a
        key={icon}
        className={cx(
          styles.link,
          className,
        )}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon icon={icon} />
      </a>
    ))}
  </div>
);

export default FooterSocialLinks;
