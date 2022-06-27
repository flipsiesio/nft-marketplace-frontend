import React, {
  FC, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal, Text, Button,
} from 'components';
import styles from './styles.module.scss';

type Props = {
  title: string
  isLoading: boolean,
  isOpen?: boolean
  onToggle: () => void
  onSubmit: () => void
};

const DelistModal: FC<Props> = ({
  isLoading,
  isOpen = false,
  onSubmit,
  onToggle,
  title,
}) => {
  const { t } = useTranslation();

  const submitHandler = useCallback(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Modal classNameContent={styles.wrap} isOpen={isOpen} onClose={onToggle}>
      <Text className={styles.title}>{title}</Text>
      <Button
        className={styles.button}
        disabled={isLoading}
        onClick={submitHandler}
      >
        {isLoading ? t('explore.loading') : t('nftMarket.confirm')}
      </Button>
    </Modal>
  );
};

export { DelistModal };
