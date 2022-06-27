import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { MarketCard } from 'components/MarketCard';
import { Checkbox, Pagination, Text } from 'components';
import { useDispatch } from 'react-redux';
import { useShallowSelector, useTabHandlers } from 'hooks';
import { nftMarketSelector } from 'store/selectors';
import {
  nftMarketGetMyGalleryAction,
  nftMarketSelectProfileAction,
} from 'store/nftMarket/actions';
import { NftReqDto } from 'types';
import { marketURL, PAGE_ITEM_LIMIT, routes } from 'appConstants';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from '../styles.module.scss';

const MyGalleryTab: FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { myGallery } = useShallowSelector(nftMarketSelector.getState);

  const {
    pageCount,
    page,
    setPage,
    getBidsOrSalePrice,
  } = useTabHandlers(marketURL.MARKETPLACE.PERSONAL_LIST);

  const [listed, setListed] = useState(false);
  const [inWallet, setInWallet] = useState(false);

  useEffect(() => {
    let inWalletListed: NftReqDto['inWalletListed'] = 'All';

    if (listed) inWalletListed = 'Listed';
    if (inWallet) inWalletListed = 'InWallet';

    dispatch(nftMarketGetMyGalleryAction({
      limit: PAGE_ITEM_LIMIT,
      skip: page * PAGE_ITEM_LIMIT,
      inWalletListed,
    }));
  }, [dispatch, page, listed, inWallet]);

  const listedHandler = useCallback((e, value: boolean) => {
    setListed(value);
    setInWallet(false);
  }, []);

  const walletHandler = useCallback((e, value: boolean) => {
    setInWallet(value);
    setListed(false);
  }, []);

  const onCardClick = useCallback((id: number) => {
    dispatch(nftMarketSelectProfileAction(undefined));
    history.push({
      pathname: routes.nftMarket.myGalleryProfile.root,
      search: `?id=${id}`,
    });
  }, [dispatch]);

  return (
    <div className={styles.wrap}>
      <div className={styles.checkboxWrap}>
        <Checkbox
          checked={listed}
          className={styles.checkbox}
          name="listed"
          label="Listed"
          onChange={listedHandler}
        />
        <Checkbox
          checked={inWallet}
          className={styles.checkbox}
          name="inWallet"
          label="In wallet"
          onChange={walletHandler}
        />
      </div>
      <div className={styles.cardContainer}>
        {myGallery.length === 0 && (
          <Text className={styles.emptyLabel}>{t('nftMarket.empty')}</Text>
        )}
        {myGallery.map((item) => (
          <MarketCard
            className={styles.card}
            key={item.cardId}
            id={item.cardId}
            img={item.url}
            type={item.face}
            price={getBidsOrSalePrice(item)}
            onCardClick={onCardClick}
          />
        ))}
      </div>
      <Pagination page={page} onChange={setPage} pageCount={pageCount} />
    </div>
  );
};

export { MyGalleryTab };
