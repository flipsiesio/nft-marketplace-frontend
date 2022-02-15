import React, { FC, useCallback, useState } from 'react';
import { Button, Modal, Text } from 'components';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { routes, TRONSCAN_URL } from 'appConstants';
import { useDispatch } from 'react-redux';
import { useJackpotInfo, useShallowSelector } from 'hooks';
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
  const { avaliableNftAmount } = useJackpotInfo();
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
    history.push(routes.nftMarket.myGalleryProfile.root);
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
            {avaliableNftAmount}
            &nbsp;
            {t('claimModalJackpot.jackpotNft')}
          </Text>
          <Text className={styles.label}>{t('claimModalJackpot.claimLabel')}</Text>
          <Button
            onClick={claimHandler}
            className={styles.button}
            disabled={avaliableNftAmount === 0}
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
          <a className={styles.link} href={`${TRONSCAN_URL}${trxHash}`} target="_blank" rel="noopener noreferrer">
            {t('claimModalJackpot.seeOnTronscan')}
          </a>
        </>
      )}
    </Modal>
  );
};

export { ClaimJackpotModal };
