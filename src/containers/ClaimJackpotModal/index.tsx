import React, { FC, useCallback, useState } from 'react';
import { Button, Modal, Text } from 'components';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { routes, scanTransactionUrl } from 'appConstants';
import { useDispatch } from 'react-redux';
import { useShallowSelector } from 'hooks';
import { tronSelector } from '../../store/selectors';
import { nftMarketClaimJackpotAction, nftMarketGetMyGalleryAction } from '../../store/nftMarket/actions';
import styles from './styles.module.scss';

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
  const history = useHistory();
  const [isSent, setSent] = useState(false);
  const [trxHash, setTrxHash] = useState('');
  const address = useShallowSelector(tronSelector.getProp('address'));

  const claimHandler = useCallback(() => {
    dispatch(nftMarketClaimJackpotAction(
      (res: string) => {
        setSent(true);
        setTrxHash(res);
      },
    ));
  }, [dispatch, setSent]);

  const seeGalleryHandler = useCallback(() => {
    onToggle();
    dispatch(nftMarketGetMyGalleryAction());
    history.push(`${routes.nftMarket.root}?tab=My+Gallery`);
  }, [history]);

  return (
    <Modal classNameContent={styles.wrap} isOpen={isOpen} onClose={onToggle}>
      {!isSent && (
        <>
          <Text>{t('claimModalJackpot.address1')}</Text>
          <Text>{address}</Text>
          <Text>
            {t('claimModalJackpot.address2')}
            &nbsp;
            &nbsp;
            {t('claimModalJackpot.jackpotNft')}
          </Text>
          <Text className={styles.label}>{t('claimModalJackpot.claimLabel')}</Text>
          <Button
            onClick={claimHandler}
            className={styles.button}
          >
            {t('claimModalJackpot.claim')}
          </Button>
        </>
      )}
      {isSent && (
        <>
          <Text>{t('claimModalJackpot.nftSentLabel')}</Text>
          <Text>{address}</Text>
          <Button
            className={styles.button}
            onClick={seeGalleryHandler}
          >
            {t('claimModalJackpot.seeInGallery')}
          </Button>
          <a className={styles.link} href={`${scanTransactionUrl}${trxHash}`} target="_blank" rel="noopener noreferrer">
            {t('claimModalJackpot.seeOnTronscan')}
          </a>
        </>
      )}
    </Modal>
  );
};

export { ClaimJackpotModal };
