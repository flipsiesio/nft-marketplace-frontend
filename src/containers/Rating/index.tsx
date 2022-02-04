import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  H4,
  Text,
  Icon,
  Copy,
} from 'components';
import { jackpotGetDataAction, jackpotGetValueAction } from 'store/jackpot/actions';
import { useDispatch } from 'react-redux';
import { useShallowSelector } from 'hooks';
import {
  jackpotSelector,
  tronSelector,
} from 'store/selectors';
import { lightenDarkenColor, getAmountSum } from 'utils';
import { TronStatus } from 'appConstants';
import { TrxUsdConverter } from '..';
import styles from './styles.module.scss';

const Rating = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const jackpots = useShallowSelector(jackpotSelector.getProp('data'));
  const jackpot = useShallowSelector(jackpotSelector.getProp('value'));
  const tronStatus = useShallowSelector(tronSelector.getProp('status'));

  useEffect(() => {
    dispatch(jackpotGetDataAction());
  }, []);

  useEffect(() => {
    if (tronStatus === TronStatus.ADDRESS_SELECTED) {
      dispatch(jackpotGetValueAction());
    }
  }, [tronStatus]);

  return (
    tronStatus === TronStatus.ADDRESS_SELECTED ? (
      <section className={styles.section}>
        <div className={styles.header}>
          <H4 className={styles.winnersTitle}>
            <Icon icon="moneybag" className={styles.winnersTitleIcon} />
            {t('rating.jackpotWinners')}
          </H4>
          <div className={styles.jackpotTitle}>
            <Icon icon="cash" className={styles.jackpotTitleIcon} />
            <H4 align="center">{`${t('rating.jackpot')}: ${jackpot} TRX`}</H4>
            <Text
              color="secondary"
              size="big"
              align="center"
            >
              <TrxUsdConverter trx={jackpot} />
            </Text>
          </div>
        </div>

        <ul className={styles.rating}>
          {jackpots.length > 0 ? jackpots.map((player, index) => (
            <li key={player.requestId} className={styles.player}>
              <Copy value={player.userAddress} className={styles.address}>
                {player.userAddress}
              </Copy>
              <div className={styles.playerRating}>
                <div className={styles.playerRatingValue}>
                  <H4>{getAmountSum(player.winColorAmount, player.winPokerAmount)} TRX</H4>
                  <H4 className={styles.playerRatingUsd}>
                    <TrxUsdConverter
                      trx={getAmountSum(player.winColorAmount, player.winPokerAmount)}
                    />
                  </H4>
                </div>
                <span
                  className={styles.band}
                  style={{
                    width: `${(getAmountSum(player.winColorAmount, player.winPokerAmount) * 100) / getAmountSum(jackpots[0].winColorAmount, jackpots[0].winPokerAmount)}%`,
                    backgroundColor: lightenDarkenColor('#EB5757', -(index * 20)),
                  }}
                />
              </div>
            </li>
          )) : <></>}
        </ul>
      </section>
    ) : <></>
  );
};

export default Rating;
