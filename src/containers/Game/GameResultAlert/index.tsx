import React, { FC, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { GameActionTypes } from 'store/game/actionTypes';
import apiActions from 'store/api/actions';
import { gameClaimAction } from 'store/game/actions';
import {
  gameSelector,
  tronSelector,
  uiSelector,
} from 'store/selectors';
import {
  H4,
  Text,
  Modal,
  Button,
} from 'components';
import { TrxUsdConverter } from 'containers';
import { useShallowSelector } from 'hooks';
import type { TextColor } from 'types';
import { GAME_TYPE, GameType, RequestStatus } from 'appConstants';
import { getAmountSum, roundUpNumber } from 'utils';
import avatar from 'assets/img/king.svg';
import dealerAvatar from 'assets/img/avatar-dealer.svg';
import styles from './styles.module.scss';

type Props = {
  isOpen: boolean,
  parentSelector: string,
  onHide: () => void,
};

const GameResultAlert: FC<Props> = ({ isOpen, parentSelector, onHide }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const name = useShallowSelector(tronSelector.getProp('name'));
  const claimReqStatus = useShallowSelector(uiSelector.getProp(GameActionTypes.CLAIM));
  const {
    winColorAmount,
    winPokerAmount,
    result,
    isColorWin,
    requestId,
  } = useShallowSelector(gameSelector.getProp('result'));
  const claimLoading = useShallowSelector(gameSelector.getProp('claimLoading'));

  const amount = +roundUpNumber(getAmountSum(winColorAmount, winPokerAmount));
  const type = GAME_TYPE[result];
  const isClaimLoading = claimLoading.includes(requestId);

  const textColor = useMemo<TextColor>(() => {
    const colors: Record<GameType, TextColor> = {
      lost: 'error',
      win: 'success',
      jackpot: 'success',
      draw: 'secondary',
    };

    return colors[type];
  }, [type]);

  const textValue = useMemo<string>(() => {
    const values: Record<GameType, string> = {
      lost: t('game.youLost'),
      win: `${t('game.youWon')} ${amount} TRX`,
      jackpot: `${t('game.youWon')} ${amount} TRX`,
      draw: t('game.youDraw'),
    };

    return values[type];
  }, [amount]);

  const isWinner = useMemo(() => ['jackpot', 'win'].includes(type), [type]);

  const handleClose = useCallback(() => {
    dispatch(apiActions.reset(GameActionTypes.CLAIM));
    onHide();
  }, [claimLoading]);

  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={false}
      className={styles.modal}
      classNameOverlay={styles.overlay}
      parentSelector={() => document.querySelector(parentSelector) as HTMLElement}
      onClose={handleClose}
    >
      <H4 className={styles.title}>{t('game.results')}:</H4>
      <div className={styles.content}>
        {type === 'draw' ? (
          <div className={styles.drawPhotos}>
            <div className={cx(styles.avatar, styles.drawPhotosDealer)}>
              <img src={dealerAvatar} alt="Dealer" />
            </div>
            <div className={cx(styles.avatar, styles.drawPhotosPlayer)}>
              <img src={avatar} alt="Player" />
            </div>
          </div>
        ) : (
          <div className={cx(styles.avatar, styles.avatarSingle)}>
            <img src={avatar} alt="Player" />
          </div>
        )}
        <div className={styles.info}>
          <Text size="big" className={styles.user}>{type === 'draw' ? `${name} & Dealer` : name}</Text>
          <div>
            <H4 color={textColor}>
              {textValue}
            </H4>

            {isColorWin && (
              <Text
                size="medium"
                bold
                color="success"
                className={styles.colorBet}
              >
                Your bet on the color won
              </Text>
            )}

            {isWinner && (
              <Text
                size="big"
                bold
                color="secondary"
                align="right"
              >
                <TrxUsdConverter trx={amount} />
              </Text>
            )}
          </div>
        </div>
        {Boolean(amount > 0) && (claimReqStatus !== RequestStatus.SUCCESS && claimLoading) && (
          <div className={styles.claimWrap}>
            <Button
              size="small"
              use="rounded"
              disabled={isClaimLoading}
              onClick={() => dispatch(gameClaimAction(requestId))}
            >
              {isClaimLoading ? 'Loading...' : 'Claim reward'}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default GameResultAlert;
