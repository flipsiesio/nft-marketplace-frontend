import React, { FC, useCallback } from 'react';
import cx from 'classnames';
import logoHoldem from 'assets/img/logoHoldem.svg';
import logoFlipsies from 'assets/img/logoFlipsies.png';
import styles from './styles.module.scss';

type Props = {
  view?: 'holdem' | 'flipsies',
  className?: string,
};

const Logo: FC<Props> = ({
  view = 'holdem',
  className,
}) => {
  const getLogo = useCallback(() => {
    const sources = {

      holdem: logoHoldem,
      flipsies: logoFlipsies,
    };

    return sources[view];
  }, [view]);

  return (
    <img
      src={getLogo()}
      className={cx(styles.logo, className)}
      alt="Logo"
    />
  );
};

export default Logo;
