import React, {
  FC, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal, Text, Input, Button,
} from 'components';
import styles from './styles.module.scss';
import { usePrice } from '../../utils';
import { MarketType } from '../../types';

type Props = {
  isLoading: boolean
  isOpen?: boolean
  onToggle: () => void
  onSubmit: (value: string) => void
  marketType?: MarketType
};

const SetPriceModal: FC<Props> = ({
  isLoading,
  isOpen = false,
  onSubmit,
  onToggle,
  marketType,
}) => {
  const { t } = useTranslation();
  const {
    changeHandler,
    hasError,
    value,
    notEnoughFunds,
  } = usePrice(marketType);

  const submitHandler = useCallback(() => {
    onSubmit(value);
  }, [onSubmit, value]);

  return (
    <Modal
      classNameContent={styles.wrap}
      isOpen={isOpen}
      onClose={!isLoading ? onToggle : undefined}
    >
      <Text className={styles.title}>{t('nftMarket.setPrice')}</Text>
      <Input placeholder={t('nftMarket.setPrice')} value={value} onChange={changeHandler} />
      <Button
        className={styles.button}
        onClick={submitHandler}
        disabled={isLoading || hasError || notEnoughFunds}
      >
        {isLoading ? t('explore.loading') : t('nftMarket.confirm')}
      </Button>
      {notEnoughFunds && (
        <Text className={styles.notFunds}>{t('nftMarket.notHaveEnoughFunds')}</Text>
      )}
    </Modal>
  );
};

export { SetPriceModal };
