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
  isSale?: boolean
};

const MarketFilterModal: FC<Props> = ({
  isOpen,
  onToggle,
  onApply,
  isSale,
}) => {
  const [data, setData] = useState<FilterData>({
    price: 'DESC',
    type: new Set<NftType>(),
    suit: new Set<NftSuit>(),
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

  const priceHandler = useCallback((type: FilterData['price']) => {
    return () => {
      setData({
        ...data,
        price: type,
      });
    };
  }, [data]);

  const typeHandler = useCallback((type: NftType) => {
    return (e: ChangeEvent<HTMLInputElement>, value: boolean) => {
      const newData = new Set(data.type);
      if (value) {
        newData.add(type);

        if (type === NftType.JOKER) {
          newData.add(NftType.RARE);
        }
      } else {
        newData.delete(type);
      }

      setData({
        ...data,
        type: newData,
      });
    };
  }, [data]);

  const suitHandler = useCallback((suit: NftSuit) => {
    return (e: ChangeEvent<HTMLInputElement>, value: boolean) => {
      const newData = new Set(data.suit);

      if (value) {
        newData.add(suit);
      } else {
        newData.delete(suit);
      }

      setData({
        ...data,
        suit: newData,
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
        label={isSale ? t('marketFilterModal.price.price') : t('marketFilterModal.price.highestBid')}
      >
        <div className={styles.checkboxWrap}>
          <Checkbox
            checked={data.price === 'ASC'}
            onChange={priceHandler('ASC')}
            classNameCheckmark={styles.checkmark}
            className={styles.checkbox}
            name="Highest price"
            label={t('marketFilterModal.price.asc')}
          />
          <Checkbox
            checked={data.price === 'DESC'}
            onChange={priceHandler('DESC')}
            classNameCheckmark={styles.checkmark}
            className={styles.checkbox}
            name="Highest bid"
            label={t('marketFilterModal.price.desc')}
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
            checked={data.type.has(NftType.KING)}
            onChange={typeHandler(NftType.KING)}
            classNameCheckmark={styles.checkmark}
            className={styles.checkbox}
            name="King"
            label={t('marketFilterModal.type.king')}
          />
          <Checkbox
            checked={data.type.has(NftType.JACK)}
            onChange={typeHandler(NftType.JACK)}
            classNameCheckmark={styles.checkmark}
            className={styles.checkbox}
            name="Jack"
            label={t('marketFilterModal.type.jack')}
          />
          <Checkbox
            checked={data.type.has(NftType.QUEEN)}
            onChange={typeHandler(NftType.QUEEN)}
            classNameCheckmark={styles.checkmark}
            className={styles.checkbox}
            name="Queen"
            label={t('marketFilterModal.type.queen')}
          />
          <Checkbox
            checked={data.type.has(NftType.JOKER)}
            onChange={typeHandler(NftType.JOKER)}
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
            checked={data.suit.has(NftSuit.HEARTS)}
            onChange={suitHandler(NftSuit.HEARTS)}
            classNameCheckmark={styles.checkmark}
            className={styles.checkbox}
            name="Hearts"
            label={t('marketFilterModal.suit.hearts')}
          />
          <Checkbox
            checked={data.suit.has(NftSuit.CLUBS)}
            onChange={suitHandler(NftSuit.CLUBS)}
            classNameCheckmark={styles.checkmark}
            className={styles.checkbox}
            name="Clubs"
            label={t('marketFilterModal.suit.clubs')}
          />
          <Checkbox
            checked={data.suit.has(NftSuit.DIAMONDS)}
            onChange={suitHandler(NftSuit.DIAMONDS)}
            classNameCheckmark={styles.checkmark}
            className={styles.checkbox}
            name="Diamonds"
            label={t('marketFilterModal.suit.diamonds')}
          />
          <Checkbox
            checked={data.suit.has(NftSuit.SPADES)}
            onChange={suitHandler(NftSuit.SPADES)}
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
