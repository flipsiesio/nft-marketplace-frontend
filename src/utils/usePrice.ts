import {
  ChangeEventHandler, useCallback, useEffect, useMemo, useState,
} from 'react';
import { ethers } from 'ethers';
import { useShallowSelector } from 'hooks';
import { walletSelectors } from 'store/selectors';
import { MarketType } from '../types';
import { getContractByMarketType, getFeeString1 } from './convertHelpers';
import { getBalance } from './metamask';

export const usePrice = (marketType?: MarketType) => {
  const [value, setValue] = useState<string>('');
  const [notEnoughFunds, setEnoughFunds] = useState(false);
  const [feeInBps, setFeeInBps] = useState<ethers.BigNumber>();
  const [maxFee, setMaxFee] = useState<ethers.BigNumber>();

  const address = useShallowSelector(walletSelectors.getProp('address'));

  const changeHandler = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    const newValue = e.target.value.replace(',', '.');
    setValue(newValue);
  }, []);

  const hasError = useMemo(() => {
    if (value.length === 0) return true;

    const reg = /([0-9]*[.])?[0-9]+/;
    const execValue = reg.exec(value);
    if (execValue === null) return true;
    if (value.length !== execValue[0].length) return true;

    const valueAfterPoint = value.split('.')[1];
    if (valueAfterPoint && valueAfterPoint.length > 6) return true;

    return false;
  }, [value, marketType]);

  useEffect(() => {
    if (!marketType) return;
    const init = async () => {
      const contract = await getContractByMarketType(marketType);
      const feeInBpsContract: ethers.BigNumber = await contract.feeInBps();
      const maxFeeContract: ethers.BigNumber = await contract.MAX_FEE();
      setFeeInBps(feeInBpsContract);
      setMaxFee(maxFeeContract);
    };

    init();
  }, [marketType]);

  useEffect(() => {
    if (!value.length) return;
    if (hasError) return;
    if (!feeInBps || !maxFee) return;

    const price = ethers.utils.parseUnits(value, 18);
    const amountBN = ethers.BigNumber.from(getFeeString1(feeInBps, maxFee, price));

    getBalance(address).then((balance) => {
      setEnoughFunds(balance.lte(amountBN));
    });
  }, [marketType, value, hasError, address]);

  return {
    changeHandler,
    hasError,
    value,
    notEnoughFunds,
  };
};
