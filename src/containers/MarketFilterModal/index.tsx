import React, {
  ChangeEvent, FC, useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Checkbox, Dropdown, Modal,
} from 'components';
import { FilterData } from 'types/containers';
import { NftSuit, NftType } from 'types';
import { Text } from '../../components/Typography';
import { useToggle } from '../../hooks';
import styles from './styles.module.scss';

type Props = {
  isOpen: boolean
  onToggle: () => void
  onApply: (data: FilterData) => void
};

const MarketFilterModal: FC<Props> = ({
  isOpen,
  onToggle,
  onApply,
}) => {
  const [data, setData] = useState<FilterData>({
    price: {
      highestBid: false,
      highestPrice: false,
    },
    type: NftType.King,
    suit: NftSuit.Diamonds,
  });
  const { t } = useTranslation();

  const {
    isActive: priceDropdown,
    onToggle: onPriceToggle,
  } = useToggle(true);

  const {
    isActive: typeDropdown,
    onToggle: onTypeToggle,
  } = useToggle(true);

  const {
    isActive: suitDropdown,
    onToggle: suitToggle,
  } = useToggle(true);

  const priceHandler = useCallback((type: keyof FilterData['price']) => {
    return (e: ChangeEvent<HTMLInputElement>, value: boolean) => {
      if (type === 'highestPrice') {
        setData({
          ...data,
          price: {
            highestPrice: value,
            highestBid: false,
          },
        });
      }

      if (type === 'highestBid') {
        setData({
          ...data,
          price: {
            highestPrice: false,
            highestBid: value,
          },
        });
      }
    };
  }, [data]);

  const typeHandler = useCallback((type: NftType) => {
    return (e: ChangeEvent<HTMLInputElement>, value: boolean) => {
      setData({
        ...data,
        type: value ? type : undefined,
      });
    };
  }, [data]);

  const suitHandler = useCallback((suit: NftSuit) => {
    return (e: ChangeEvent<HTMLInputElement>, value: boolean) => {
      setData({
        ...data,
        suit: value ? suit : undefined,
      });
    };
  }, [data]);

  const applyHandler = useCallback(() => {
    onApply(data);
    onToggle();
  }, [onApply, data, onToggle]);

  return (
    <Modal onClose={onToggle} classNameContent={styles.wrap} isOpen={isOpen}>
      <Text className={styles.title}>
        {t('marketFilterModal.title')}
      </Text>

      <Dropdown
        className={styles.dropdown}
        isActive={priceDropdown}
        onToggle={onPriceToggle}
        label={t('marketFilterModal.price.title')}
      >
        <div className={styles.checkboxWrap}>
          <Checkbox
            checked={data.price.highestPrice}
            onChange={priceHandler('highestPrice')}
            classNameCheckmark={styles.checkmark}
            className={styles.checkbox}
            name="Highest price"
            label={t('marketFilterModal.price.highestPrice')}
          />
          <Checkbox
            checked={data.price.highestBid}
            onChange={priceHandler('highestBid')}
            classNameCheckmark={styles.checkmark}
            className={styles.checkbox}
            name="Highest bid"
            label={t('marketFilterModal.price.highestBid')}
          />
        </div>
      </Dropdown>
      <div className={styles.divider} />

      <Dropdown
        className={styles.dropdown}
        isActive={typeDropdown}
        onToggle={onTypeToggle}
        label={t('marketFilterModal.type.title')}
      >
        <div className={styles.checkboxWrap}>
          <Checkbox
            checked={NftType.King === data.type}
            onChange={typeHandler(NftType.King)}
            classNameCheckmark={styles.checkmark}
            className={styles.checkbox}
            name="King"
            label={t('marketFilterModal.type.king')}
          />
          <Checkbox
            checked={NftType.Jack === data.type}
            onChange={typeHandler(NftType.Jack)}
            classNameCheckmark={styles.checkmark}
            className={styles.checkbox}
            name="Jack"
            label={t('marketFilterModal.type.jack')}
          />
          <Checkbox
            checked={NftType.Queen === data.type}
            onChange={typeHandler(NftType.Queen)}
            classNameCheckmark={styles.checkmark}
            className={styles.checkbox}
            name="Queen"
            label={t('marketFilterModal.type.queen')}
          />
          <Checkbox
            checked={NftType.Rare === data.type}
            onChange={typeHandler(NftType.Rare)}
            classNameCheckmark={styles.checkmark}
            className={styles.checkbox}
            name="Rare"
            label={t('marketFilterModal.type.rare')}
          />
        </div>
      </Dropdown>
      <div className={styles.divider} />

      <Dropdown
        className={styles.dropdown}
        isActive={suitDropdown}
        onToggle={suitToggle}
        label={t('marketFilterModal.suit.title')}
      >
        <div className={styles.checkboxWrap}>
          <Checkbox
            checked={NftSuit.Hearts === data.suit}
            onChange={suitHandler(NftSuit.Hearts)}
            classNameCheckmark={styles.checkmark}
            className={styles.checkbox}
            name="Hearts"
            label={t('marketFilterModal.suit.hearts')}
          />
          <Checkbox
            checked={NftSuit.Clubs === data.suit}
            onChange={suitHandler(NftSuit.Clubs)}
            classNameCheckmark={styles.checkmark}
            className={styles.checkbox}
            name="Clubs"
            label={t('marketFilterModal.suit.clubs')}
          />
          <Checkbox
            checked={NftSuit.Diamonds === data.suit}
            onChange={suitHandler(NftSuit.Diamonds)}
            classNameCheckmark={styles.checkmark}
            className={styles.checkbox}
            name="Diamonds"
            label={t('marketFilterModal.suit.diamonds')}
          />
          <Checkbox
            checked={NftSuit.Spades === data.suit}
            onChange={suitHandler(NftSuit.Spades)}
            classNameCheckmark={styles.checkmark}
            className={styles.checkbox}
            name="Spades"
            label={t('marketFilterModal.suit.spades')}
          />
        </div>
      </Dropdown>
      <div className={styles.divider} />

      <Button onClick={applyHandler} className={styles.button}>
        Apply filters
      </Button>
    </Modal>
  );
};

export { MarketFilterModal };
