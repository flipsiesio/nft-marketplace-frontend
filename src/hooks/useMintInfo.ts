import { TokenOptions } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { useEffect, useState } from 'react';
import { walletSelectors } from 'store/selectors';
import { ethers } from 'ethers';
import { WalletStatus } from '../store/wallet/types';
import { getCardFactoryContract, getCardRandomMinterContract } from '../utils/contracts';

export const useMintInfo = () => {
  const [price, setPrice] = useState(0);
  const [avaliableNftAmount, setAvaliableNftAmount] = useState(0);
  const { status, address } = useShallowSelector(walletSelectors.getState);

  useEffect(() => {
    const init = async () => {
      const contract =
        await getCardRandomMinterContract();

      const nftPrice: ethers.BigNumber = await contract.price();
      setPrice(nftPrice.toNumber());

      const factoryContract = await getCardFactoryContract();
      const colorizedNftAmount =
        await factoryContract.availableTokens(TokenOptions.COLORIZED_OPTION);
      const eggsNftAmount =
        await factoryContract.availableTokens(TokenOptions.CARDS_WITH_EGGS_OPTION);
      const tearsNftAmount =
        await factoryContract.availableTokens(TokenOptions.CARDS_WITH_TEARS_OPTION);
      const jokersNftAmount =
        await factoryContract.availableTokens(TokenOptions.JOKERS_OPTION);
      const rareNftAmount = await factoryContract.availableTokens(TokenOptions.RARE_OPTION);
      const amount = colorizedNftAmount.toNumber() + eggsNftAmount.toNumber() +
      tearsNftAmount.toNumber() + jokersNftAmount.toNumber() + rareNftAmount.toNumber();
      setAvaliableNftAmount(amount);
    };

    if (status === WalletStatus.CONNECTED) {
      init();
    }
  }, [status, address]);

  return {
    price,
    avaliableNftAmount,
  };
};
