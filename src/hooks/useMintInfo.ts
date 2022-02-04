import { useEffect, useState } from 'react';
import { getTronContract } from '../utils';

// TODO: Here need NFT amount
export const useMintInfo = () => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const init = async () => {
      const contract =
        await getTronContract(process.env.REACT_APP_CONTRACT_CARD_RANDOM_MINTER as string);

      const nftPrice = await contract.price().call();
      setPrice(nftPrice);
    };

    init();
  }, []);

  return {
    price,
  };
};
