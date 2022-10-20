import { TokenOptions } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { useEffect, useState, useCallback } from 'react';
import { walletSelectors } from 'store/selectors';
import { ethers, ContractTransaction } from 'ethers';
import { Token } from 'types';
import {
  getAddress, getCardFactoryContract, getCardRandomMinterContract, getTokenContract,
} from 'utils';
import { WalletStatus } from 'store/wallet/types';

export const useMintInfo = (token: Token) => {
  const [price, setPrice] = useState(ethers.BigNumber.from(0));
  const [availableNftAmount, setAvailableNftAmount] = useState(0);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [isLoadingApprove, setIsLoadingApprove] = useState<boolean>(false);
  const [allowanceToken, setAllowanceToken] = useState(ethers.constants.MaxUint256);
  const { status, address } = useShallowSelector(walletSelectors.getState);

  const checkAllowance = useCallback(async () => {
    if (token.label !== 'BTT') {
      const contractToken = await getTokenContract(token.address);
      const myAddress = await getAddress();

      const allowanceTokenRaw: ethers.BigNumber = await contractToken.allowance(
        myAddress[0],
        `${process.env.REACT_APP_CONTRACT_CARD_RANDOM_MINTER as string}`,
      );

      setAllowanceToken(allowanceTokenRaw);
    }
  }, [token]);

  const approveToken = useCallback(async () => {
    setIsLoadingApprove(true);
    const contractToken = await getTokenContract(token.address);
    const tx: ContractTransaction = await contractToken.approve(
      process.env.REACT_APP_CONTRACT_CARD_RANDOM_MINTER as string,
      ethers.constants.MaxUint256,
    );
    await tx.wait();
    await checkAllowance();
    setIsLoadingApprove(false);
  }, [token]);

  useEffect(() => {
    const init = async () => {
      setIsLoadingData(true);
      const contract =
        await getCardRandomMinterContract();

      const nftPrice: ethers.BigNumber = await contract.getMintPrice(token.address);
      setPrice(nftPrice);

      const factoryContract = await getCardFactoryContract();

      const colorizedNftAmount =
        await factoryContract.availableTokens(TokenOptions.COLORIZED_OPTION);
      const eggsNftAmount =
        await factoryContract.availableTokens(TokenOptions.CARDS_WITH_EGGS_OPTION);
      const tearsNftAmount =
        await factoryContract.availableTokens(TokenOptions.CARDS_WITH_TEARS_OPTION);
      const jokersNftAmount =
        await factoryContract.availableTokens(TokenOptions.JOKERS_OPTION);
      const rareNftAmount =
        await factoryContract.availableTokens(TokenOptions.RARE_OPTION);

      const amount = colorizedNftAmount.toNumber() +
        eggsNftAmount.toNumber() +
        tearsNftAmount.toNumber() +
        jokersNftAmount.toNumber() +
        rareNftAmount.toNumber();

      setAvailableNftAmount(amount);

      checkAllowance();
      setIsLoadingData(false);
    };

    if (status === WalletStatus.CONNECTED) {
      init();
    }
  }, [status, address, token]);

  const isNeedApprove = price.gt(allowanceToken);

  return {
    price,
    availableNftAmount,
    isNeedApprove,
    isLoadingApprove,
    approveToken,
    isLoadingData,
  };
};
