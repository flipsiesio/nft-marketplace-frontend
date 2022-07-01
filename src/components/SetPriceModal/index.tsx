import React, {
  FC, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal, Text, Input, Button,
} from 'components';
import styles from './styles.module.scss';
import { usePrice } from '../../utils';

type Props = {
  isLoading: boolean
  isOpen?: boolean
  onToggle: () => void
  onSubmit: (value: string) => void
};

const SetPriceModal: FC<Props> = ({
  isLoading,
  isOpen = false,
  onSubmit,
  onToggle,
}) => {
  const { t } = useTranslation();
  const {
    changeHandler,
    hasError,
    value,
  } = usePrice();

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
        disabled={isLoading || hasError}
      >
        {isLoading ? t('explore.loading') : t('nftMarket.confirm')}
      </Button>
    </Modal>
  );
};

export { SetPriceModal };
