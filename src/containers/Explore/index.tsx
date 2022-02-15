import React, { FC } from 'react';
import {
  Button, InfoModal, NftArtwork, Text,
} from 'components';
import {
  useConnectWallet, useJackpotInfo, useShallowSelector, useToggle,
} from 'hooks';
import { MintModal } from 'containers/MintModal';
import { useTranslation } from 'react-i18next';
import KingOfHearts from 'assets/img/nft/KingOfHearts.svg';
import KingOfDiamonds from 'assets/img/nft/KingOfDiamonds.svg';
import QueenOfSpades from 'assets/img/nft/QueenOfSpades.svg';
import QueenOfClubs from 'assets/img/nft/QueenOfClubs.svg';
import { flipsiesGameUrl } from 'appConstants/url';
import JackOfDiamonds from 'assets/img/nft/JackOfDiamonds.svg';
import JackOfSpades from 'assets/img/nft/JackOfSpades.svg';
import JackOfHearts from 'assets/img/nft/JackOfHearts.svg';
import { TronStatus } from 'appConstants';
import { ClaimJackpotModal } from 'containers';
import { tronSelector } from 'store/selectors';
import styles from './styles.module.scss';

const Explore: FC = () => {
  const { t } = useTranslation();
  const { isActive: mintActive, onToggle: toggleMint } = useToggle();
  const { isActive: claimIsActive, onToggle: toggleClaim } = useToggle();
  const { isActive: infoIsActive, onToggle: toggleInfo } = useToggle();
  const { handleConnect } = useConnectWallet();
  const { status } = useShallowSelector(tronSelector.getState);
  const address = useShallowSelector(tronSelector.getProp('address'));
  const { avaliableNftAmount } = useJackpotInfo();

  const onClaimClick = () => {
    if (status !== TronStatus.ADDRESS_SELECTED) {
      handleConnect();
    } else if (avaliableNftAmount) {
      toggleClaim();
    } else toggleInfo();
  };

  const onMintClick = () => {
    if (status !== TronStatus.ADDRESS_SELECTED) {
      handleConnect();
    } else {
      toggleMint();
    }
  };

  const infoSubmit = () => {
    toggleInfo();
    window.open(flipsiesGameUrl);
  };

  return (
    <div className={styles.wrap}>
      <Text className={styles.title}>{t('explore.title')}</Text>
      <Text className={styles.subTitle}>{t('explore.tryLuck')}</Text>
      <Button onClick={onMintClick} className={styles.button}>{t('explore.mintNow')}</Button>
      <button onClick={onClaimClick} className={styles.claimButton} type="button">{t('explore.claimNft')}</button>

      <div className={styles.cardContainer}>
        <NftArtwork
          title={t('exploreNft.kingOfHearts.title')}
          description={t('exploreNft.kingOfHearts.label')}
          img={KingOfHearts}
        />
        <NftArtwork
          title={t('exploreNft.kingOfDiamonds.title')}
          description={t('exploreNft.kingOfDiamonds.label')}
          img={KingOfDiamonds}
        />
        <NftArtwork
          title={t('exploreNft.queenOfSpades.title')}
          description={t('exploreNft.queenOfSpades.label')}
          img={QueenOfSpades}
        />
        <NftArtwork
          title={t('exploreNft.queenOfClubs.title')}
          description={t('exploreNft.queenOfClubs.label')}
          img={QueenOfClubs}
        />
        <NftArtwork
          title={t('exploreNft.jackOfDiamonds.title')}
          description={t('exploreNft.jackOfDiamonds.label')}
          img={JackOfDiamonds}
        />
        <NftArtwork
          title={t('exploreNft.jackOfSpadesAndJackOfHearts.title')}
          description={t('exploreNft.jackOfSpadesAndJackOfHearts.label')}
          img={JackOfSpades}
          secondImg={JackOfHearts}
        />
      </div>
      <MintModal onToggle={toggleMint} isOpen={mintActive} />
      <ClaimJackpotModal isOpen={claimIsActive} onToggle={toggleClaim} />
      <InfoModal
        isOpen={infoIsActive}
        onToggle={toggleInfo}
        buttonText="explore.playWin"
        onSubmit={infoSubmit}
      >
        <Text>{t('claimModalJackpot.address1')}</Text>
        <Text>{address}</Text>
        <Text>
          {t('explore.notEligible')}
        </Text>
      </InfoModal>
    </div>
  );
};

export { Explore };
