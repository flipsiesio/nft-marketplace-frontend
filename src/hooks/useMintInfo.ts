import { TokenOptions, TronStatus } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { useEffect, useState } from 'react';
import { tronSelector } from 'store/selectors';
import { fromSunToNumber, getTronContract } from 'utils';

export const useMintInfo = () => {
  const [price, setPrice] = useState(0);
  const [avaliableNftAmount, setAvaliableNftAmount] = useState(0);
  const { status, address } = useShallowSelector(tronSelector.getState);

  useEffect(() => {
    const init = async () => {
      const contract =
        await getTronContract(process.env.REACT_APP_CONTRACT_CARD_RANDOM_MINTER as string);

      const nftPrice = await contract.price().call();
      setPrice(fromSunToNumber(nftPrice.toString()));

      const factoryContract =
        await getTronContract(process.env.REACT_APP_CONTRACT_CARD_FACTORY as string);
      const colorizedNftAmount =
        await factoryContract.availableTokens(TokenOptions.COLORIZED_OPTION).call();
      const eggsNftAmount =
        await factoryContract.availableTokens(TokenOptions.CARDS_WITH_EGGS_OPTION).call();
      const tearsNftAmount =
        await factoryContract.availableTokens(TokenOptions.CARDS_WITH_TEARS_OPTION).call();
      const jokersNftAmount =
        await factoryContract.availableTokens(TokenOptions.JOKERS_OPTION).call();
      const rareNftAmount = await factoryContract.availableTokens(TokenOptions.RARE_OPTION).call();
      const amount = colorizedNftAmount.toNumber() + eggsNftAmount.toNumber() +
      tearsNftAmount.toNumber() + jokersNftAmount.toNumber() + rareNftAmount.toNumber();
      setAvaliableNftAmount(amount);
    };

    if (status === TronStatus.ADDRESS_SELECTED) {
      init();
    }
  }, [status, address]);

  return {
    price,
    avaliableNftAmount,
  };
};
