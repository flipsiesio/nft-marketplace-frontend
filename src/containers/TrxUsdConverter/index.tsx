import React, { FC } from 'react';
import { useShallowSelector } from 'hooks';
import { trxUsdRateSelector } from 'store/selectors';

type Props = {
  trx: number,
};

const TrxUsdConverter: FC<Props> = ({ trx = 0 }) => {
  const rate: number = useShallowSelector(trxUsdRateSelector.getProp('rate'));
  return (
    <>{`${(trx * rate).toFixed(2)} USD`}</>
  );
};

export default TrxUsdConverter;
