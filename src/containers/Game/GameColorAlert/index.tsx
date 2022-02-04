import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { Icon, Text } from 'components';
import styles from './styles.module.scss';

type Props = {
  isOpen: boolean,
  isWin: boolean | null,
  timeoutToHide?: number,
  className?: string,
  onHide: () => void,
};

const GameColorAlert: FC<Props> = ({
  isOpen,
  isWin,
  timeoutToHide = 3000,
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
    <div
      className={cx(
        styles.wrap,
        styles[isWin ? 'win' : 'lost'],
        className,
      )}
    >
      <Icon icon={isWin ? 'medal' : 'sad'} className={styles.icon} />
      <Text>{t('game.colorBet')} {isWin ? t('game.win') : t('game.lost')}</Text>
    </div>
  ) : <></>;
};

export default GameColorAlert;
