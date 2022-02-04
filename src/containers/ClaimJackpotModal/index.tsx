import React, { FC, useCallback, useState } from 'react';
import { Button, Modal, Text } from 'components';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { useShallowSelector } from '../../hooks';
import { tronSelector } from '../../store/selectors';
import { nftMarketClaimJackpotAction } from '../../store/nftMarket/actions';

type Props = {
  isOpen: boolean
  onToggle: () => void
};

const ClaimJackpotModal: FC<Props> = ({
  isOpen,
  onToggle,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isSent, setSent] = useState(false);

  const address = useShallowSelector(tronSelector.getProp('address'));

  const claimHandler = useCallback(() => {
    dispatch(nftMarketClaimJackpotAction(() => {
      setSent(true);
    }));
  }, [dispatch, setSent]);

  return (
    <Modal classNameContent={styles.wrap} isOpen={isOpen} onClose={onToggle}>
      {!isSent && (
        <>
          <Text>{t('claimModalJackpot.address1')}</Text>
          <Text>{address}</Text>
          <Text>
            {t('claimModalJackpot.address2')}
            &nbsp;
            1 Jackpot NFT!
          </Text>
          <Text className={styles.label}>{t('claimModalJackpot.claimLabel')}</Text>
          <Button onClick={claimHandler} className={styles.button}>{t('claimModalJackpot.claim')}</Button>
        </>
      )}
      {isSent && (
        <>
          <Text>{t('claimModalJackpot.nftSentLabel')}</Text>
          <Text>{address}</Text>
          <Button className={styles.button}>{t('claimModalJackpot.seeInGallery')}</Button>
          <button className={styles.linkButton} type="button">{t('claimModalJackpot.seeOnTronscan')}</button>
        </>
      )}
    </Modal>
  );
};

export { ClaimJackpotModal };
