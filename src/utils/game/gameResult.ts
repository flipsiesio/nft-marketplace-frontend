import { Hand } from 'utils';
import { GAME_TYPE, GameType } from 'appConstants';
import type {
  GameTableCard as Card,
  Game,
} from 'types';

type CallbackProps = {
  playerCards: Card[],
  tableCards: Card[],
  name: string,
};

type HighlightCardsInPoolProps = {
  poolCards: Card[],
  cards: Card[],
  classNameWin: string,
  classNameLost: string,
};

type Props = {
  playerCards: Card[],
  dealerCards: Card[],
  tableCards: Card[],
  result: Game,
  classNameCardTableWin: string,
  classNameCardPlayerWin: string,
  classNameCardLost: string,
  timeoutToSecondPlayer: number,
  timeoutToEndCallback: number,
  dealerCallback: (params: CallbackProps) => void,
  playerCallback: (params: CallbackProps) => void,
  endCallback: () => void,
};

function transformCardsToSolver({ rank, suit }: Card): string {
  const transformedRank = (rank === '10') ? 'T' : rank;
  const transformedSuit = suit.toLowerCase();
  return `${transformedRank}${transformedSuit}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformToCardsPoker(cards: Array<any>) {
  return cards.map(({ value, suit }) => {
    const rank = value === 'T' ? '10' : value;
    return {
      rank,
      suit: suit.toUpperCase(),
    };
  });
}

function highlightCardsInPool({
  poolCards,
  cards,
  classNameWin,
  classNameLost,
}: HighlightCardsInPoolProps) {
  return cards.map((card) => {
    const isExistInPool = poolCards.some(({ rank, suit }) => {
      return card.suit === suit && card.rank === rank;
    });
    return {
      ...card,
      className: isExistInPool ? classNameWin : classNameLost,
    };
  });
}

export default function ({
  playerCards,
  dealerCards,
  tableCards,
  result,
  classNameCardTableWin,
  classNameCardPlayerWin,
  classNameCardLost,
  timeoutToSecondPlayer,
  timeoutToEndCallback,
  dealerCallback,
  playerCallback,
  endCallback,
}: Props) {
  const isDealerWin = GAME_TYPE[result.result] === GameType.LOST;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const playerCombinationResolve = Hand.solve(
    tableCards.concat(playerCards).map((card) => transformCardsToSolver(card)),
  );

  const dealerCombinationResolve = Hand.solve(
    tableCards.concat(dealerCards).map((card) => transformCardsToSolver(card)),
  );

  const dealerTableHighlightCards = highlightCardsInPool({
    poolCards: transformToCardsPoker(dealerCombinationResolve.cards),
    cards: tableCards,
    classNameWin: classNameCardTableWin,
    classNameLost: classNameCardLost,
  });

  const dealerHighlightCards = highlightCardsInPool({
    poolCards: transformToCardsPoker(dealerCombinationResolve.cards),
    cards: dealerCards,
    classNameWin: classNameCardPlayerWin,
    classNameLost: classNameCardLost,
  });

  const playerTableHighlightCards = highlightCardsInPool({
    poolCards: transformToCardsPoker(playerCombinationResolve.cards),
    cards: tableCards,
    classNameWin: classNameCardTableWin,
    classNameLost: classNameCardLost,
  });

  const playerHighlightCards = highlightCardsInPool({
    poolCards: transformToCardsPoker(playerCombinationResolve.cards),
    cards: playerCards,
    classNameWin: classNameCardPlayerWin,
    classNameLost: classNameCardLost,
  });

  const dealerCallbackParams: CallbackProps = {
    playerCards: dealerHighlightCards,
    tableCards: dealerTableHighlightCards,
    name: dealerCombinationResolve.name,
  };

  const playerCallbackParams: CallbackProps = {
    playerCards: playerHighlightCards,
    tableCards: playerTableHighlightCards,
    name: playerCombinationResolve.name,
  };

  if (isDealerWin) playerCallback(playerCallbackParams);
  else dealerCallback(dealerCallbackParams);

  const timeoutID = setTimeout(() => {
    if (isDealerWin) {
      dealerCallback(dealerCallbackParams);
    } else {
      playerCallback(playerCallbackParams);
    }

    const endTimeoutID = setTimeout(() => {
      endCallback();
      clearTimeout(endTimeoutID);
    }, timeoutToEndCallback);

    clearTimeout(timeoutID);
  }, timeoutToSecondPlayer);
}
