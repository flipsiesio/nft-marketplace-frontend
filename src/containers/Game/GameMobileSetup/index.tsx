import React, {
  FC,
  useState,
  useCallback,
  ChangeEvent,
} from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { FormikHelpers } from 'formik';
import { fromSunToNumber } from 'utils';
import {
  BlurModal,
  Checkbox,
  FieldWithIcon,
  Button,
  RangePicker, Text,
} from 'components';
import { gameSelector } from 'store/selectors';
import { useShallowSelector } from 'hooks';
import { GameSelectedColor } from 'appConstants';
import type { GameStateBet } from 'types';
import styles from './styles.module.scss';

type Props = {
  values: GameStateBet,
  userBalance: number,
  maxBet: number,
  isPlayDisabled: boolean,
  isValid: boolean,
  noBalanceLabel: string,
  minBet: number,
  setFieldValue: FormikHelpers<GameStateBet>['setFieldValue'],
  onSubmit: (values: GameStateBet) => void,
};

const GameMobileSetup: FC<Props> = ({
  values,
  userBalance,
  minBet,
  maxBet,
  setFieldValue,
  isPlayDisabled,
  isValid,
  noBalanceLabel,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const [colorSetupVisible, setColorSetupVisible] = useState<boolean>(false);
  const [flipSetupVisible, setFlipSetupVisible] = useState<boolean>(false);
  const [sameFlip, setSameFlip] = useState<boolean>(false);
  const [sameColor, setSameColor] = useState<boolean>(false);
  const lastGame = useShallowSelector(gameSelector.getProp('lastGame'));

  const handleChangeSameFlipBet = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setFieldValue('flip', fromSunToNumber(lastGame.bet));
      setSameFlip(true);
    } else {
      setFieldValue('flip', userBalance < minBet ? 0 : minBet);
      setSameFlip(false);
    }
  }, [lastGame, sameFlip]);

  const handleChangeSameColorBet = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setFieldValue('color', fromSunToNumber(lastGame.betColor));
      setSameColor(true);
    } else {
      setFieldValue('color', 0);
      setSameColor(false);
    }
  }, [lastGame, sameColor]);

  return (
    <>
      <div className={styles.checkboxes}>
        {lastGame.requestId && (
          <Checkbox
            name="sameBetColor"
            className={styles.checkbox}
            label={t('game.sameBet')}
            checked={sameColor}
            onChange={handleChangeSameColorBet}
          />
        )}
        <FieldWithIcon
          text={`${t('game.balance')}: ${userBalance.toFixed(2)}`}
          icon="triangle"
          className={cx(styles.balance, { [styles.balanceMargin]: lastGame.requestId })}
        />
        {lastGame.requestId && (
          <Checkbox
            name="sameBetFlip"
            className={styles.checkbox}
            label={t('game.sameBet')}
            checked={sameFlip}
            onChange={handleChangeSameFlipBet}
          />
        )}
      </div>

      <FieldWithIcon
        text={`${t('game.amountOfBet')}: ${values.flip + values.color}`}
        icon="triangle"
        className={styles.amount}
      />

      {!isValid && (
        <Text size="tiny" color="secondary" align="center" className={styles.noBalanceLabel}>{noBalanceLabel}</Text>
      )}

      <div className={styles.buttons}>
        <Button
          theme="blue"
          bold
          className={styles.btnMobile}
          use="rounded"
          onClick={() => setColorSetupVisible(true)}
        >
          {t('game.flopColor')}
        </Button>
        <Button
          type="submit"
          bold
          className={cx(styles.btnMobile, styles.centerBtn)}
          use="rounded"
          disabled={isPlayDisabled}
          onClick={() => onSubmit(values)}
        >
          {t('game.bet')}
        </Button>
        <Button
          theme="blue"
          bold
          className={styles.btnMobile}
          use="rounded"
          onClick={() => setFlipSetupVisible(true)}
        >
          {t('game.pokerHand')}
        </Button>
      </div>

      <BlurModal
        isOpen={colorSetupVisible}
        className={styles.mobileModal}
        classNameOverlay={styles.mobileModalOverlayLeft}
        onClose={() => setColorSetupVisible(false)}
      >
        <RangePicker
          top
          isSwitcher
          classNameWrap={styles.colorRangePicker}
          value={values.color}
          max={maxBet}
          step={1}
          onChange={(value) => {
            setFieldValue('color', value);
            if(sameColor) setSameColor(false);
          }}
          valueSwitcher={sameColor ?
            /**
             * we check last game for number
             * according backend scheme
             */
            lastGame.selectedColor === 1
            : values.selectedColor === GameSelectedColor.BLACK}
          onSwitcher={(value) => {
            setSameColor(false);
            setFieldValue('selectedColor', value ? GameSelectedColor.BLACK : GameSelectedColor.RED);
          }}
          isVertical
          isManageBtnVisible
        />
      </BlurModal>

      <BlurModal
        isOpen={flipSetupVisible}
        className={styles.mobileModal}
        classNameOverlay={styles.mobileModalOverlayRight}
        onClose={() => setFlipSetupVisible(false)}
      >
        <RangePicker
          top
          classNameWrap={styles.flipPicker}
          min={userBalance < minBet ? 0 : minBet}
          value={values.flip}
          max={maxBet}
          step={1}
          onChange={(value) => {
            setFieldValue('flip', value);
            if(sameColor) setSameFlip(false);
          }}
          isVertical
          isManageBtnVisible
        />
      </BlurModal>
    </>
  );
};

export default GameMobileSetup;
