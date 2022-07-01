import {
  ChangeEventHandler, useCallback, useEffect, useMemo, useState,
} from 'react';
import BigNumber from 'bignumber.js';
import { MarketType } from '../types';
import { getContractName, getFeeString } from './convertHelpers';
import { getTronContract } from './tronHelpers';

export const usePrice = (marketType?: MarketType) => {
  const [value, setValue] = useState<string>('');
  const [notEnoughFunds, setEnoughFunds] = useState(false);
  const [feeInBps, setFeeInBps] = useState<BigNumber>();
  const [maxFee, setMaxFee] = useState<BigNumber>();

  const changeHandler = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setValue(e.target.value);
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
  }, [value]);

  useEffect(() => {
    if (!marketType) return;
    const init = async () => {
      const contractName = getContractName(marketType);
      const contract = await getTronContract(contractName);
      const feeInBpsContract = await contract.feeInBps().call();
      const maxFeeContract = await contract.MAX_FEE().call();
      setFeeInBps(feeInBpsContract);
      setMaxFee(maxFeeContract);
    };

    init();
  }, [marketType]);

  useEffect(() => {
    if (!value.length) return;
    if (hasError) return;

    const price: BigNumber =
      new window.tronWeb.BigNumber(window.tronWeb.toSun(parseFloat(value)));
    const amountBN: BigNumber = new window.tronWeb.BigNumber(getFeeString(feeInBps, maxFee, price));

    window.tronWeb.trx.getBalance(
      window.tronWeb.defaultAddress?.base58 || '',
    ).then((balance) => {
      const balanceBN: BigNumber = new window.tronWeb.BigNumber(balance);
      setEnoughFunds(balanceBN.lte(amountBN));
    });
  }, [marketType, value, hasError]);

  return {
    changeHandler,
    hasError,
    value,
    notEnoughFunds,
  };
};
