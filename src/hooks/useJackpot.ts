import { useEffect, useState } from 'react';

export const useJackpotInfo = () => {
  const [avaliableNftAmount, setAvaliableNftAmount] = useState(0);

  useEffect(() => {
    const init = async () => {
      /* const address =  useShallowSelector(tronSelector.getProp('address'));
      const res: ApiResponse<NftDto[]> = yield call(marketApiSaga, {
        method: 'post',
        url: marketURL.MARKETPLACE.CLAIM_JACKPOT,
        data: {
          userAddress: address,
        },
      }); */
      const amount = 0;
      setAvaliableNftAmount(amount);
    };

    init();
  }, [avaliableNftAmount]);

  return {
    avaliableNftAmount,
  };
};
