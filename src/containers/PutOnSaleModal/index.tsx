import React, {
  FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  Button, Input, Modal, Preloader, Select, Text,
} from '../../components';
import styles from './styles.module.scss';
import { getApproved, getTronContract, usePrice } from '../../utils';
import { MarketType, SelectOption } from '../../types';
import { useShallowSelector, useToggle } from '../../hooks';
import { nftMarketSelector, uiSelector } from '../../store/selectors';
import { nftMarketApproveAction, nftMarketPutOnAction } from '../../store/nftMarket/actions';
import { NftMarketActionTypes } from '../../store/nftMarket/actionTypes';

type Props = {
  isOpen: boolean
  onToggle: () => void
  marketType: MarketType
};

const getSecondsFromDays = (days: number) => {
  return days * 60 * 60 * 24;
};

const getDayFromSeconds = (seconds: number) => {
  return seconds / 60 / 60 / 24;
};

export const PutOnSaleModal: FC<Props> = ({
  isOpen,
  onToggle,
  marketType,
}) => {
  const {
    isActive: shouldApprove,
    onToggle: toggleApprove,
    setActive: setShouldApprove,
  } = useToggle(true);

  const {
    isActive: shouldSale,
    onToggle: toggleSale,
    setActive: setShouldSale,
  } = useToggle(false);

  const {
    hasError,
    changeHandler,
    value,
    notEnoughFunds,
  } = usePrice(marketType);

  const [selectOptions, setSelectOptions] = useState<SelectOption[]>([]);
  const [selectValue, setSelectValue] = useState<SelectOption>();
  const [wait, setWait] = useState(true);

  const selectedNft = useShallowSelector(nftMarketSelector.getProp('selectedNft'));
  const getApproveStatus = useShallowSelector(uiSelector.getProp(NftMarketActionTypes.APPROVE));
  const getPutOnStatus = useShallowSelector(uiSelector.getProp(NftMarketActionTypes.PUT_ON));
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isLoading = useMemo(() => {
    return getApproveStatus === 'REQUEST' ||
      getPutOnStatus === 'REQUEST';
  }, [getApproveStatus, getPutOnStatus]);

  const approveHandler = useCallback(() => {
    dispatch(nftMarketApproveAction({
      actionType: marketType,
      tokenId: selectedNft!.cardId,
    }, () => {
      toggleApprove();
      toggleSale();
    }));
  }, [toggleApprove, toggleSale, selectedNft, marketType, dispatch]);

  const saleHandler = useCallback(() => {
    if (selectedNft && selectValue) {
      dispatch(nftMarketPutOnAction({
        marketType,
        price: marketType === MarketType.Sale ? parseFloat(value) : 0,
        nftAddress: selectedNft.cardId,
        maxDuration: getSecondsFromDays(Number(selectValue?.value)),
      }, () => {
        toggleSale();
        onToggle();
      }));
    }
  }, [selectedNft, onToggle, toggleSale, marketType, value, selectValue]);

  const selectHandler = useCallback((option) => {
    setSelectValue(option as SelectOption);
  }, []);

  useEffect(() => {
    const init = async () => {
      const contractName = marketType === MarketType.Auction
        ? process.env.REACT_APP_CONTRACT_NFT_MARKETPLACE as string
        : process.env.REACT_APP_CONTRACT_NFT_SALE as string;
      const contract = await getTronContract(contractName);
      const maxExpirationDuration: string = await contract.maxExpirationDuration().call();
      const maxDuration = Number(maxExpirationDuration);
      const minExpirationDuration: string = await contract.minExpirationDuration().call();
      const minDuration = Number(minExpirationDuration);
      const maxDay = getDayFromSeconds(maxDuration);
      const minDay = getDayFromSeconds(minDuration);

      const options: SelectOption[] = [];

      for (let i = minDay; i <= maxDay; i += 1) {
        options.push({
          value: `${i}`,
          label: i <= 1 ? `${i} day` : `${i} days`,
        });
      }

      setSelectOptions(options);
      setSelectValue(options[options.length - 1]);
    };

    init();
  }, []);

  useEffect(() => {
    setWait(true);
    getApproved(selectedNft?.cardId || 0, marketType).then((res) => {
      if (res) {
        toggleApprove();
        toggleSale();
      } else {
        setShouldApprove(true);
        setShouldSale(false);
      }

      setWait(false);
    });
  }, [selectedNft, marketType, toggleApprove, toggleSale]);

  const disabled = useMemo(() => {
    if (marketType === MarketType.Auction) {
      return isLoading || notEnoughFunds || !selectValue;
    }
    return isLoading || hasError || notEnoughFunds || !selectValue;
  }, [isLoading, hasError, notEnoughFunds, selectValue, marketType]);

  return (
    <Modal
      classNameContent={styles.wrap}
      isOpen={isOpen}
      onClose={!isLoading ? onToggle : undefined}
    >
      {!wait && (
        <>
          {shouldApprove && (
            <>
              <Text className={styles.title}>{t('nftMarket.approveText')}</Text>
              <Button
                className={styles.button}
                onClick={approveHandler}
                disabled={isLoading}
              >
                {isLoading ? t('explore.loading') : t('nftMarket.confirm')}
              </Button>
            </>
          )}

          {shouldSale && (
            <>
              <Text className={styles.title}>{t('nftMarket.setSale')}</Text>
              {marketType === MarketType.Sale && (
                <Input placeholder={t('nftMarket.setPrice')} value={value} onChange={changeHandler} />
              )}
              <Select
                maxMenuHeight={200}
                value={selectValue}
                options={selectOptions}
                className={styles.select}
                onChange={selectHandler}
              />
              <Button
                className={styles.button}
                onClick={saleHandler}
                disabled={disabled}
              >
                {isLoading ? t('explore.loading') : t('nftMarket.confirm')}
              </Button>
              {notEnoughFunds && (
                <Text className={styles.notFunds}>{t('nftMarket.notHaveEnoughFunds')}</Text>
              )}
            </>
          )}
        </>
      )}

      {wait && (
        <Preloader isLoading={wait} />
      )}
    </Modal>
  );
};
