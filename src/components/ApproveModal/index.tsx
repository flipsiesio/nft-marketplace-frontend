import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal, Text, Button,
} from 'components';
import styles from './styles.module.scss';

type Props = {
  isLoading: boolean
  isOpen?: boolean
  onToggle: () => void
  onSubmit: () => void
};

const ApproveModal: FC<Props> = ({
  isLoading,
  isOpen = false,
  onSubmit,
  onToggle,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      classNameContent={styles.wrap}
      isOpen={isOpen}
      onClose={!isLoading ? onToggle : undefined}
    >
      <Text className={styles.title}>{t('nftMarket.approveText')}</Text>
      <Button
        className={styles.button}
        onClick={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? t('explore.loading') : t('nftMarket.confirm')}
      </Button>
    </Modal>
  );
};

export { ApproveModal };
