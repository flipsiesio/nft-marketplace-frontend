import React, { useContext, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { number, object } from 'yup';
import { useTranslation } from 'react-i18next';
import {
  gameSelector, jackpotSelector, tronSelector, uiSelector,
} from 'store/selectors';
import { gameSetResultAction, gameStartAction } from 'store/game/actions';
import { initialBet } from 'store/game/reducer';
import { GameActionTypes } from 'store/game/actionTypes';
import {
  Button,
  ButtonOpenGameCombination,
  Card,
  FieldWithIcon,
  GameTable,
  LoadingModal,
  RangePicker,
  Switcher,
  Text,
} from 'components';
import { GameCombinationsContext } from 'containers';
import { GameSelectedColor, RequestStatus, MIN_DESKTOP_WIDTH } from 'appConstants';
import type { GameStateBet } from 'types';
import { GameAnimateStatus } from 'hooks/useGameResult';
import { useGameResult, useShallowSelector } from 'hooks';
import { toast } from 'react-toastify';
import GameMobileSetup from './GameMobileSetup';
import GameColorAlert from './GameColorAlert';
import GameJackpotAlert from './GameJackpotAlert';
import GameResultAlert from './GameResultAlert';
import GameCombinations from './GameCombinations';
import GamePreviousGames from './GamePreviousGames';
import styles from './styles.module.scss';

const MINIMUM_BET = 13;
const NO_BALANCE_LABEL = `Check your balance. Minimum Bet is ${MINIMUM_BET} TRX`;
const POKER_CONTAINER_ID = 'poker-game-container';

const validationSchema = object().shape({
  flip: number().required().min(MINIMUM_BET),
  color: number().required(),
});

const provablyFairLink = 'https://en.wikipedia.org/wiki/Provably_fair_algorithm#:~:text=In%20online%20gambling%2C%20provably%20fair,part%20of%20the%20service%20operator';

const Game = () => {
  const dispatch = useDispatch();
  const startGameStatus = useShallowSelector(uiSelector.getProp(GameActionTypes.START));
  const getMaxBetStatus = useShallowSelector(uiSelector.getProp(GameActionTypes.GET_MAXBET));
  const { maxBet, result, bet } = useShallowSelector(gameSelector.getState);
  const { balance: userBalance, name: userName } = useShallowSelector(tronSelector.getState);
  const jackpot = useShallowSelector(jackpotSelector.getProp('value'));
  const { t } = useTranslation();

  const { isOpenGameCombination, setIsOpenGameCombination } = useContext(GameCombinationsContext);

  const maxBetToRangePicker = useMemo<number>(() => {
    return Math.floor(maxBet / 2);
  }, [maxBet]);

  const {
    status,
    dealerCombinationName,
    playerCombinationName,
    tableCards,
    playerCards,
    dealerCards,
    isColorAlertVisible,
    isResultAlertVisible,
    isJackpotAlertVisible,
    hideColorAlert,
    hideResultAlert,
    hideJackpotAlert,
    reset,
  } = useGameResult({
    colorBet: bet.color,
    result,
    classNameActive: styles.winCard,
    classNamePlayerCardWin: styles.winPlayerCard,
    classNamePlayerCardLost: styles.lostPlayerCard,
  });

  const {
    values,
    isValid,
    setFieldValue,
    handleSubmit,
    resetForm,
  } = useFormik<GameStateBet>({
    initialValues: {
      selectedColor: GameSelectedColor.RED,
      flip: userBalance > MINIMUM_BET ? MINIMUM_BET : 0,
      color: 0,
    },
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: (obj) => {
      /**
       * Temporary fix of a bug with a quick mod in the application TronLink
       */
      if (window.innerWidth < MIN_DESKTOP_WIDTH) {
        toast.warn('Please use safe mode for the best playing experience');
      }
      reset(); // reset the previous game
      dispatch(gameStartAction(obj));
    },
  });

  useEffect(() => {
    return () => {
      dispatch(gameSetResultAction(initialBet));
    };
  }, []);

  const isPlayBtnDisabled = useMemo<boolean>(() => {
    const statusToEnabled = [
      GameAnimateStatus.INIT,
      GameAnimateStatus.END,
    ];
    return !statusToEnabled.includes(status) || !isValid;
  }, [status, isValid]);

  return (
    <Card className={styles.card}>
      <div id={POKER_CONTAINER_ID} className={styles.cardGameContent}>
        <GameResultAlert
          isOpen={!isJackpotAlertVisible && isResultAlertVisible}
          parentSelector={`#${POKER_CONTAINER_ID}`}
          onHide={() => {
            hideResultAlert();
            resetForm();
          }}
        />
        <GameJackpotAlert
          isOpen={isJackpotAlertVisible}
          onHide={() => hideJackpotAlert()}
        />
        <div className={styles.desktopSetup}>
          {getMaxBetStatus !== RequestStatus.REQUEST && (
          <>
            <RangePicker
              label={t('game.pokerHand')}
              classNameWrap={styles.flipRangePicker}
              value={values.flip}
              min={userBalance > MINIMUM_BET ? MINIMUM_BET : 0}
              max={maxBetToRangePicker}
              onChange={(value) => setFieldValue('flip', value)}
            />

            <RangePicker
              label={t('game.flopColor')}
              classNameWrap={styles.colorRangePicker}
              value={values.color}
              max={maxBetToRangePicker}
              step={1}
              onChange={(value) => setFieldValue('color', value)}
            />

            <Switcher
              leftLabel={t('game.red')}
              rightLabel={t('game.black')}
              className={styles.switcher}
              checked={values.selectedColor === GameSelectedColor.BLACK}
              classNameLeft={styles.redSwitch}
              classNameRight={styles.blackSwitch}
              classNameActive={styles.switcherActive}
              onChange={(value) => setFieldValue('selectedColor', value ? GameSelectedColor.BLACK : GameSelectedColor.RED)}
            />
            <FieldWithIcon
              text={userBalance}
              icon="triangle"
            />
            {!isValid && (
              <Text size="tiny" color="secondary" className={styles.noBalanceLabel}>{NO_BALANCE_LABEL}</Text>
            )}
            <Button
              className={styles.startBtn}
              use="rounded"
              disabled={isPlayBtnDisabled}
              onClick={() => handleSubmit()}
            >
              {t('game.start')}
            </Button>

            <Text>
              Flipsies is a <a target="_blank" rel="noopener noreferrer" className={styles.provablyLink} href={provablyFairLink}>provably fair</a> game.
            </Text>
          </>
          )}
        </div>

        <GameTable
          className={styles.gameTable}
          cards={tableCards}
          dealer={{
            name: 'Flipsies',
            combination: dealerCombinationName,
            isHighlight: status === GameAnimateStatus.RESULT_DEALER,
            cards: dealerCards,
          }}
          player={{
            name: userName,
            combination: playerCombinationName,
            isHighlight: status === GameAnimateStatus.RESULT_PLAYER,
            cards: playerCards,
          }}
          jackpot={jackpot}
        />

        <div className={styles.mobileSetup}>
          <GameMobileSetup
            values={values}
            userBalance={userBalance}
            maxBet={maxBetToRangePicker}
            minBet={MINIMUM_BET}
            isPlayDisabled={isPlayBtnDisabled}
            setFieldValue={setFieldValue}
            isValid={isValid}
            noBalanceLabel={NO_BALANCE_LABEL}
            onSubmit={() => handleSubmit()}
          />
        </div>
      </div>

      <GamePreviousGames className={styles.previousGames} />

      <LoadingModal
        isLoading={startGameStatus === RequestStatus.REQUEST}
        title="Waiting for the response from Oracle."
      />

      <GameColorAlert
        isOpen={isColorAlertVisible}
        isWin={result.isColorWin}
        onHide={() => hideColorAlert()}
      />

      <GameCombinations
        isOpen={isOpenGameCombination}
        onClose={() => setIsOpenGameCombination(false)}
      />

      <ButtonOpenGameCombination
        className={styles.handRankingsBtn}
        handlerOpen={() => setIsOpenGameCombination(true)}
      />
    </Card>
  );
};

export default Game;
