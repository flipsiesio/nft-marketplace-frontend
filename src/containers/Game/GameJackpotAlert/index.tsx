import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { H4, Icon } from 'components';
import styles from './styles.module.scss';

type Props = {
  isOpen: boolean,
  timeoutToHide?: number,
  className?: string,
  onHide: () => void,
};

const GameJackpotAlert: FC<Props> = ({
  isOpen,
  timeoutToHide = 5500,
  className,
  onHide,
}) => {
  const { t } = useTranslation();
  useEffect(() => {
    let timeout = null as unknown;
    if (isOpen) {
      timeout = setTimeout(() => onHide(), timeoutToHide);
    }

    return () => clearTimeout(timeout as NodeJS.Timeout);
  }, [isOpen]);

  return isOpen ? (
    <div className={styles.overlay}>
      <div className={cx(styles.wrap, className)}>
        <span className={styles.icon}>
          <Icon icon="moneybag" />
        </span>
        <H4 align="center">{t('game.youWonJackpot')}</H4>
      </div>
    </div>
  ) : <></>;
};

export default GameJackpotAlert;
