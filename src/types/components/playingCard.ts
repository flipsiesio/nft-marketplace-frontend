/**
 * Suit
 *  S = spades
 *  H = hearts
 *  C = clubs
 *  D = diamonds
 */
export type PlayingCardSuit = 'S' | 'H' | 'C' | 'D';

/**
 * Rank
 * A = ace
 * J = jack
 * Q = queen
 * K = king
 * S = jester (joker)
 */
export type PlayingCardRank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'S';

export type PlayingCardProps = {
  rank?: PlayingCardRank,
  suit?: PlayingCardSuit,
  isInverted?: boolean,
  className?: string,
};
