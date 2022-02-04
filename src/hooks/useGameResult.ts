/* eslint-disable no-shadow */
import { useEffect, useState, useCallback } from 'react';
import {
  Game,
  GameTableCard,
  PlayingCardSuit as Suit,
} from 'types';
import {
  transformCards,
  gameAudio,
  sleepForMs,
  fromSunToNumber,
} from 'utils';
import { gameResult } from 'utils/game';
import {
  GameSelectedColor,
  GameType,
  SELECTED_COLORS,
  GAME_TYPE,
} from 'appConstants';
import { useDispatch } from 'react-redux';
import { gameGetPreviousAction } from 'store/game/actions';

export enum GameAnimateStatus {
  INIT = 'INIT',
  START = 'START',
  DEAL = 'DEAL',
  PLAYER_INVERTED = 'PLAYER_INVERTED',
  FLOP = 'FLOP',
  DEALER_INVERTED = 'DEALER_INVERTED',
  COLOR_RESULT = 'COLOR_RESULT',
  RIVER = 'RIVER',
  RESULT = 'RESULT',
  RESULT_PLAYER = 'RESULT_PLAYER',
  RESULT_DEALER = 'RESULT_DEALER',
  END = 'END',
}

const INTERVALS = {
  deal: 400,
  invertPlayersCards: 500,
  flop: 500,
  river: 500,
};

const TIMEOUTS = {
  deal: 1000,
  invertPlayerCards: 1000,
  invertDealerCards: 1000,
  afterColorResult: 4000,
  beforeRiver: 3000,
  afterRiver: 2000,
  afterTern: 3000,
  betweenResultPlayers: 3000,
  beforeShowResult: 2000,
};

function dealTableCards(
  tableCards: GameTableCard[],
  callback: (tableCard: GameTableCard) => void,
  endCallback: () => void,
) {
  let i = 0;
  const START_AUDIO_INDEX = 1;

  const intervalID = setInterval(() => {
    if (i === START_AUDIO_INDEX) gameAudio.playDeal();
    if (i < tableCards.length) {
      callback({
        ...tableCards[i],
        isInverted: true,
      });
      i++;
    } else {
      const timeoutID = setTimeout(() => {
        endCallback();
        clearTimeout(timeoutID);
      }, TIMEOUTS.deal);
      clearInterval(intervalID);
    }
  }, INTERVALS.deal);
}

function invertPlayerCards(
  playerCards: GameTableCard[],
  callback: (index: number, tableCard: GameTableCard) => void,
  endCallback: () => void,
) {
  let i = 0;
  const intervalID = setInterval(() => {
    if (i < playerCards.length) {
      gameAudio.playInvertCard();
      callback(i, {
        ...playerCards[i],
        isInverted: false,
      });
      i++;
    } else {
      const timeoutID = setTimeout(() => {
        endCallback();
        clearTimeout(timeoutID);
      }, TIMEOUTS.invertPlayerCards);
      clearInterval(intervalID);
    }
  }, INTERVALS.invertPlayersCards);
}

function flop(
  cards: GameTableCard[],
  callback: (index: number, card: GameTableCard) => void,
  endCallback: () => void,
) {
  let i = 0;
  const FLOP_COUNT = 3;
  const intervalID = setInterval(() => {
    if (i < FLOP_COUNT) {
      gameAudio.playInvertCard();
      callback(i, {
        ...cards[i],
        isInverted: false,
      });
      i++;
    } else {
      clearInterval(intervalID);
    }
  }, INTERVALS.flop);

  // after flop not need pause
  endCallback();
}

function invertDealerCards(
  dealerCards: GameTableCard[],
  callback: (index: number, tableCard: GameTableCard) => void,
  endCallback: () => void,
) {
  let i = 0;
  const intervalID = setInterval(() => {
    if (i < dealerCards.length) {
      gameAudio.playInvertCard();
      callback(i, {
        ...dealerCards[i],
        isInverted: false,
      });
      i++;
    } else {
      const timeoutID = setTimeout(() => {
        endCallback();
        clearTimeout(timeoutID);
      }, TIMEOUTS.invertDealerCards);
      clearInterval(intervalID);
    }
  }, INTERVALS.invertPlayersCards);
}

async function highlightColorCards(
  cards: GameTableCard[],
  result: Game,
  className: string,
  callback: (cards: GameTableCard[]) => void,
  endCallback: () => void,
) {
  const redSuits: Array<Suit> = ['D', 'H'];
  const betColor = fromSunToNumber(result.betColor);

  const highlightedCards = cards.map((card, index) => {
    if (index < 3 && result.isColorWin && betColor > 0) {
      if (SELECTED_COLORS[result.selectedColor] === GameSelectedColor.RED) {
        return {
          ...card,
          className: redSuits.includes(card.suit) ? className : '',
        };
      }

      return {
        ...card,
        className: !redSuits.includes(card.suit) ? className : '',
      };
    }

    return card;
  });

  callback(highlightedCards);
  if (betColor > 0) await sleepForMs(TIMEOUTS.afterColorResult);
  endCallback();
}

async function river(
  cards: GameTableCard[],
  callback: (index: number, card: GameTableCard) => void,
  endCallback: () => void,
) {
  gameAudio.playInvertCard();
  callback(3, {
    ...cards[3],
    isInverted: false,
  });

  await sleepForMs(TIMEOUTS.afterTern);

  gameAudio.playInvertCard();
  callback(4, {
    ...cards[4],
    isInverted: false,
  });

  await sleepForMs(TIMEOUTS.afterRiver);
  endCallback();
}

type Props = {
  result: Game,
  colorBet: number,
  classNameActive: string,
  classNamePlayerCardWin: string,
  classNamePlayerCardLost: string,
};

export default ({
  result,
  colorBet,
  classNameActive,
  classNamePlayerCardWin,
  classNamePlayerCardLost,
}: Props) => {
  const dispatch = useDispatch();
  const [tableCards, setTableCards] = useState<GameTableCard[]>([]);
  const [dealerCombinationName, setDealerCombinationName] = useState<string>('');
  const [playerCombinationName, setPlayerCombinationName] = useState<string>('');
  const [playerCards, setPlayerCards] = useState<GameTableCard[]>([]);
  const [dealerCards, setDealerCards] = useState<GameTableCard[]>([]);
  const [status, setStatus] = useState<GameAnimateStatus>(GameAnimateStatus.INIT);
  const [isColorAlertVisible, setColorAlertVisible] = useState<boolean>(false);
  const [isResultAlertVisible, setResultAlertVisible] = useState<boolean>(false);
  const [isJackpotAlertVisible, setJackpotAlertVisible] = useState<boolean>(false);

  useEffect(() => {
    if (result.requestId) {
      setStatus(GameAnimateStatus.START);
      const transformedCards = transformCards(result.cards).map((el) => ({
        ...el,
        isInverted: true,
      }));

      setPlayerCards(transformedCards.filter((el, index) => index < 2));
      setDealerCards(transformedCards.filter((el, index) => index > 6));
      dealTableCards(
        transformedCards.filter((el, index) => index > 1 && index < 7),
        (card) => {
          setTableCards((prevState) => [
            ...prevState,
            card,
          ]);
        },
        () => setStatus(GameAnimateStatus.PLAYER_INVERTED),
      );
    }
  }, [result]);

  useEffect(() => {
    switch (status) {
      case GameAnimateStatus.PLAYER_INVERTED: {
        invertPlayerCards(
          playerCards,
          (index, value) => setPlayerCards((prevState) => prevState.map((card, cardIndex) => {
            return cardIndex === index ? value : card;
          })),
          () => setStatus(GameAnimateStatus.FLOP),
        );
        break;
      }

      case GameAnimateStatus.FLOP: {
        flop(
          tableCards,
          (index, value) => setTableCards((prevState) => prevState.map((card, cardIndex) => {
            return cardIndex === index ? value : card;
          })),
          () => setStatus(GameAnimateStatus.DEALER_INVERTED),
        );
        break;
      }

      case GameAnimateStatus.DEALER_INVERTED: {
        invertDealerCards(
          dealerCards,
          (index, value) => setDealerCards((prevState) => prevState.map((card, cardIndex) => {
            return cardIndex === index ? value : card;
          })),
          () => setStatus(GameAnimateStatus.COLOR_RESULT),
        );
        break;
      }

      case GameAnimateStatus.COLOR_RESULT: {
        highlightColorCards(
          tableCards,
          result,
          classNameActive,
          (cards) => {
            setTableCards(cards);
            if (colorBet > 0) {
              if (result.isColorWin) {
                gameAudio.playWinColor();
              }
              setColorAlertVisible(true);
            }
          },
          async () => {
            // if was color bet set timeout before next step
            setTableCards((prevState) => prevState.map((el) => ({
              ...el,
              className: '',
            })));
            await sleepForMs(TIMEOUTS.beforeRiver);
            setStatus(GameAnimateStatus.RIVER);
          },
        );
        break;
      }

      case GameAnimateStatus.RIVER: {
        river(
          tableCards,
          (index, value) => setTableCards((prevState) => prevState.map((card, cardIndex) => {
            return cardIndex === index ? value : card;
          })),
          () => setStatus(GameAnimateStatus.RESULT),
        );
        break;
      }

      case GameAnimateStatus.RESULT: {
        gameResult({
          playerCards,
          dealerCards,
          tableCards,
          result,
          classNameCardTableWin: classNameActive,
          classNameCardPlayerWin: classNamePlayerCardWin,
          classNameCardLost: classNamePlayerCardLost,
          timeoutToSecondPlayer: TIMEOUTS.betweenResultPlayers,
          timeoutToEndCallback: TIMEOUTS.beforeShowResult,
          dealerCallback: ({ playerCards, tableCards, name }) => {
            setStatus(GameAnimateStatus.RESULT_DEALER);
            setDealerCards(playerCards);
            setTableCards(tableCards);
            setDealerCombinationName(name);
          },
          playerCallback: ({ playerCards, tableCards, name }) => {
            setStatus(GameAnimateStatus.RESULT_PLAYER);
            setPlayerCards(playerCards);
            setTableCards(tableCards);
            setPlayerCombinationName(name);
          },
          endCallback: () => {
            if (GAME_TYPE[result.result] === GameType.JACKPOT) {
              setJackpotAlertVisible(true);
              gameAudio.playJackpot();
            } else if (GAME_TYPE[result.result] === GameType.WIN) {
              gameAudio.playWinner();
            }

            dispatch(gameGetPreviousAction());
            setResultAlertVisible(true);
            setStatus(GameAnimateStatus.END);
          },
        });
        break;
      }

      default:
        break;
    }
  }, [status]);

  const hideColorAlert = useCallback(() => {
    setColorAlertVisible(false);
  }, []);

  const hideResultAlert = useCallback(() => {
    setResultAlertVisible(false);
  }, []);

  const hideJackpotAlert = useCallback(() => {
    setJackpotAlertVisible(false);
  }, []);

  const reset = useCallback(() => {
    setPlayerCards([]);
    setDealerCards([]);
    setTableCards([]);
    setStatus(GameAnimateStatus.INIT);
    setDealerCombinationName('');
    setPlayerCombinationName('');
  }, [
    setPlayerCards,
    setDealerCards,
    setTableCards,
    setStatus,
    setDealerCombinationName,
    setPlayerCombinationName,
  ]);

  return {
    status,
    dealerCombinationName,
    playerCombinationName,
    tableCards,
    playerCards,
    dealerCards,
    isJackpotAlertVisible,
    isColorAlertVisible,
    isResultAlertVisible,
    hideColorAlert,
    hideResultAlert,
    hideJackpotAlert,
    reset,
  };
};
