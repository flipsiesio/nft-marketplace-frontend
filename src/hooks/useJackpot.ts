import { TronStatus } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { useEffect, useState } from 'react';
import { tronSelector } from 'store/selectors';

export const useJackpotInfo = () => {
  const [avaliableNftAmount, setAvaliableNftAmount] = useState(0);
  const { status, address } = useShallowSelector(tronSelector.getState);

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
    if (status === TronStatus.ADDRESS_SELECTED) {
      init();
    }
  }, [status, address]);

  return {
    avaliableNftAmount,
  };
};
