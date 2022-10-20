import React, {
  FC, useCallback, useState,
} from 'react';
import {
  Button, Modal, Select, Text, SelectToken,
} from 'components';
import { SelectOption, Token } from 'types';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { routes, scanTransactionUrl, tokens } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { nftMarketSelector, walletSelectors, uiSelector } from 'store/selectors';
import { fromWeiToNumber } from 'utils';
import { nftMarketMintNowAction, nftMarketSignInAction } from '../../store/nftMarket/actions';
import { useMintInfo } from '../../hooks/useMintInfo';
import styles from './styles.module.scss';

type Props = {
  isOpen: boolean
  onToggle: () => void
};

const options: SelectOption[] = [
  { value: '1', label: '1x random Flipsies NFT' },
  { value: '3', label: '3x random Flipsies NFT' },
  { value: '5', label: '5x random Flipsies NFT' },
];

const MintModal: FC<Props> = ({
  isOpen,
  onToggle,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState<SelectOption>();
  const [selectedTokeOption, setSelectedTokenOption] = useState<Token>({
    address: tokens.Native.address,
    label: 'BTT',
    price: tokens.Native.price,
    decimals: tokens.Native.decimals,
  });
  const getMintStatus = useShallowSelector(uiSelector.getProp('NFT_MARKET.MINT_NOW'));
  const address = useShallowSelector(walletSelectors.getProp('address'));
  const isAuth = useShallowSelector(nftMarketSelector.getProp('isAuth'));
  const [trxHash, setTrxHash] = useState('');
  const [isSent, setSent] = useState(false);

  const {
    price, availableNftAmount, approveToken, isNeedApprove, isLoadingApprove, isLoadingData,
  } = useMintInfo(selectedTokeOption);

  const selectHandler = useCallback((option) => {
    setSelectedOption(option as SelectOption);
  }, []);

  const mintHandler = useCallback(() => {
    if (!selectedOption) return;
    dispatch(nftMarketMintNowAction({
      amount: parseInt(selectedOption.value, 36),
      token: selectedTokeOption.address,
    },
    (res: string) => {
      setTrxHash(res);
      setSent(true);
    }));
  }, [selectedOption, dispatch, onToggle, setSent, selectedTokeOption]);

  const seeGalleryHandler = useCallback(() => {
    if (isAuth) {
      onToggle();
      history.push(`${routes.nftMarket.root}?tab=My+Gallery`);
    } else {
      dispatch(nftMarketSignInAction(() => {
        history.push(`${routes.nftMarket.root}?tab=My+Gallery`);
      }));
    }
  }, [history, isAuth, dispatch]);

  const handleSelectToken = useCallback((token: Token) => {
    setSelectedTokenOption(token);
  }, []);

  return (
    <Modal
      classNameContent={styles.wrap}
      isOpen={isOpen}
      onClose={getMintStatus === 'REQUEST' ? undefined : onToggle}
    >
      {!isSent && (
        <>
          <div className={styles.containerTitle}>
            <Text className={styles.title}>
              {t('explore.mintModalTitle1')}
              &nbsp;
              {!isLoadingData && `${
                selectedOption ?
                  fromWeiToNumber(price.mul(selectedOption.value), selectedTokeOption.decimals) :
                  fromWeiToNumber(price, selectedTokeOption.decimals)
              } `}
            </Text>

            <SelectToken onSelect={handleSelectToken} value={selectedTokeOption.label} />

            <Text className={styles.title}>
              &nbsp;
              {t('explore.mintModalTitle2')}
            </Text>
          </div>
          <Select
            value={selectedOption}
            onChange={selectHandler}
            className={styles.selector}
            options={options}
          />
          <div className={styles.containerButtons}>

            {isNeedApprove && (
              <Button
                disabled={!selectedOption || isLoadingApprove}
                onClick={approveToken}
                className={styles.buttonApprove}
              >
                {isLoadingApprove ? t('explore.loading') : t('explore.approve')}
              </Button>
            )}
            <Button
              disabled={!selectedOption || getMintStatus === 'REQUEST' || isNeedApprove}
              onClick={mintHandler}
              className={styles.button}
            >
              {getMintStatus === 'REQUEST' ? t('explore.loading') : t('explore.mint')}
            </Button>
          </div>
          <Text className={styles.label}>
            {t('explore.mintModalLabel1')}
            &nbsp;
            <Text className={styles.green} tag="span">
              {availableNftAmount}
            </Text>
            &nbsp;
            {t('explore.mintModalLabel2')}
          </Text>
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
          <a
            className={styles.link}
            href={`${scanTransactionUrl}${trxHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('claimModalJackpot.seeOnTronscan')}
          </a>
        </>
      )}
    </Modal>
  );
};

export { MintModal };
