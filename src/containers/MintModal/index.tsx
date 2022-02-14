import React, {
  FC, useCallback, useState,
} from 'react';
import {
  Button, Modal, Select, Text,
} from 'components';
import { SelectOption } from 'types';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useShallowSelector } from 'hooks';
import { uiSelector } from 'store/selectors';
import { nftMarketMintNowAction } from '../../store/nftMarket/actions';
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
  const [selectedOption, setSelectedOption] = useState<SelectOption>();
  const getMintStatus = useShallowSelector(uiSelector.getProp('NFT_MARKET.MINT_NOW'));

  const { price, avaliableNftAmount } = useMintInfo();

  const selectHandler = useCallback((option) => {
    setSelectedOption(option as SelectOption);
  }, []);

  const mintHandler = useCallback(() => {
    if (!selectedOption) return;
    dispatch(nftMarketMintNowAction(
      parseInt(selectedOption.value, 36),
      () => {
        onToggle();
      },
    ));
  }, [selectedOption, dispatch, onToggle]);

  return (
    <Modal classNameContent={styles.wrap} isOpen={isOpen} onClose={onToggle}>
      <Text className={styles.title}>
        {t('explore.mintModalTitle1')}
        &nbsp;
        {`${
          selectedOption ?
            price * Number(selectedOption?.value) : price
        } TRX`}
        &nbsp;
        {t('explore.mintModalTitle2')}
      </Text>
      <Select
        value={selectedOption}
        onChange={selectHandler}
        className={styles.selector}
        options={options}
      />
      <Button
        disabled={!selectedOption || getMintStatus === 'REQUEST'}
        onClick={mintHandler}
        className={styles.button}
      >
        {getMintStatus === 'REQUEST' ? t('explore.loading') : t('explore.mint')}
      </Button>
      <Text className={styles.label}>
        {t('explore.mintModalLabel1')}
        &nbsp;
        {/* TODO get amount from backend */}
        <Text className={styles.green} tag="span">
          {avaliableNftAmount}
        </Text>
        &nbsp;
        {t('explore.mintModalLabel2')}
      </Text>
    </Modal>
  );
};

export { MintModal };
