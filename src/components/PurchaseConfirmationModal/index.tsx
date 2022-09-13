import React, { FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal, Text, Button,
} from 'components';
import cx from 'classnames';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import styles from './styles.module.scss';

type Props = {
  isLoading?: boolean,
  isOpen?: boolean
  onToggle: () => void
  onSubmit: () => void
  price: string
  id: number
  balance: string
};

export const PurchaseConfirmationModal: FC<Props> = ({
  isLoading,
  isOpen = false,
  onSubmit,
  onToggle,
  id,
  price,
  balance,
}) => {
  const { t } = useTranslation();

  const notEnoughFunds = useMemo(() => {
    const balanceSun = ethers.BigNumber.from(balance);
    const priceBN = ethers.utils.parseUnits(price, 18);

    return balanceSun.lte(priceBN);
  }, [price, balance]);

  const clickHandler = useCallback(() => {
    const balanceSun = ethers.BigNumber.from(balance);
    const priceBN = ethers.utils.parseUnits(price, 18);

    if (balanceSun.lte(priceBN)) {
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
      <Text className={styles.title}>{t('nftMarket.purchaseConfirmation')}</Text>
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
      <Button
        className={styles.button}
        onClick={clickHandler}
        disabled={isLoading || notEnoughFunds}
      >
        {isLoading ? t('explore.loading') : t('nftMarket.confirm')}
      </Button>
      {notEnoughFunds && (
        <Text className={styles.notFunds}>{t('nftMarket.notHaveEnoughFunds')}</Text>
      )}
    </Modal>
  );
};
