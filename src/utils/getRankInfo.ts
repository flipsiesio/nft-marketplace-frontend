import { BigNumber } from 'bignumber.js';
import { RANKS } from 'appConstants';

type Values = {
  name: string,
  maxValue: string,
  bonus: string,
};

export default (rankValue: string): Values => {
  let valueToReturn: Values = {
    name: '',
    maxValue: '',
    bonus: '',
  };
  const rank = new BigNumber(rankValue, 10);

  RANKS.every((el, index) => {
    const currentValue = new BigNumber(el.value, 10);
    if (rank.comparedTo(currentValue) === -1) {
      valueToReturn = {
        name: RANKS[index - 1].label || 'bronze',
        maxValue: currentValue.toString(10),
        bonus: RANKS[index - 1].bonus || '1',
      };
      return false;
    }
    return true;
  });

  return valueToReturn;
};
