import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal, Button,
} from 'components';
import styles from './styles.module.scss';

type Props = {
  buttonText: string,
  isLoading?: boolean
  isOpen?: boolean
  onToggle: () => void
  onSubmit: () => void
};

const InfoModal: FC<Props> = ({
  buttonText,
  isLoading,
  isOpen = false,
  onSubmit,
  onToggle,
  children,
}) => {
  const { t } = useTranslation();

  return (
    <Modal classNameContent={styles.wrap} isOpen={isOpen} onClose={onToggle}>
      {children}
      <Button
        className={styles.button}
        onClick={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? t('explore.loading') : t(buttonText)}
      </Button>
    </Modal>
  );
};

export { InfoModal };
