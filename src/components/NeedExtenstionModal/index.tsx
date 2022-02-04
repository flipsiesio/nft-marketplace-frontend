import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, H4, Button } from 'components';
import styles from './styles.module.scss';

type Props = {
  isOpen: boolean,
  onClose?: () => void,
};

const TRON_EXTENSION_URL = 'https://chrome.google.com/webstore/detail/tronlink%EF%BC%88%E6%B3%A2%E5%AE%9D%E9%92%B1%E5%8C%85%EF%BC%89/ibnejdfjmmkpcnlpebklmnkoeoihofec';
const TRON_EXTENSION_URL_MOBILE_ANDROID = 'https://play.google.com/store/apps/details?id=com.tronlinkpro.wallet';
const TRON_EXTENSION_URL_MOBILE_IOS = 'https://apps.apple.com/us/app/tronlink/id1453530188';

const NeedExtensionModal: FC<Props> = ({
  isOpen,
  onClose = () => {},
}) => {
  const { t } = useTranslation();

  const handleRedirect = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.open(TRON_EXTENSION_URL_MOBILE_IOS, '_blank');
        return;
      }

      window.open(TRON_EXTENSION_URL_MOBILE_ANDROID, '_blank');
      return;
    }

    window.open(TRON_EXTENSION_URL, '_blank');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <H4 align="center" className={styles.title}>{t('header.extensionInstallTitle')}</H4>
      <Button
        className={styles.installBtn}
        onClick={handleRedirect}
      >
        {t('header.extensionInstall')}
      </Button>
    </Modal>
  );
};

export default NeedExtensionModal;
