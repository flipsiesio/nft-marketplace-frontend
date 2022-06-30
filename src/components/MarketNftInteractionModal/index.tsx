import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal, Text, Button,
} from 'components';
import cx from 'classnames';
import { toast } from 'react-toastify';
import styles from './styles.module.scss';
import { fromSunToNumber } from '../../utils';

type Props = {
  isLoading?: boolean,
  title?: string
  isOpen?: boolean
  onToggle: () => void
  onSubmit: () => void
  price?: string
  id?: number
  balance?: number
};

const MarketNftInteractionModal: FC<Props> = ({
  isLoading,
  isOpen = false,
  onSubmit,
  onToggle,
  title,
  id,
  price,
  balance,
}) => {
  const { t } = useTranslation();

  const clickHandler = useCallback(() => {
    const convertPrice = fromSunToNumber(`${price}`);

    if (balance && balance < convertPrice) {
      toast.error(t('nftMarket.notHaveEnoughFunds'));
      return;
    }

    onSubmit();
  }, [price, balance, onSubmit, t]);

  return (
    <Modal
      classNameContent={styles.wrap}
      isOpen={isOpen}
      onClose={!isLoading ? onToggle : undefined}
    >
      <Text className={styles.title}>{title}</Text>
      <div className={styles.row}>
        <div className={styles.col}>
          <Text className={styles.text}>
            {t('nftMarket.id')}
          </Text>
          <Text className={styles.bold} tag="span">{`#${id}`}</Text>
        </div>
        <div className={styles.col}>
          <Text className={styles.text}>
            {t('nftMarket.price')}
          </Text>
          <Text className={styles.bold}>
            {price}
            &nbsp;
            <Text className={cx(styles.primary, styles.bold)} tag="span">TRX</Text>
          </Text>
        </div>
      </div>
      <Button className={styles.button} onClick={clickHandler} disabled={isLoading}>
        {isLoading ? t('explore.loading') : t('nftMarket.confirm')}
      </Button>
    </Modal>
  );
};

export { MarketNftInteractionModal };
