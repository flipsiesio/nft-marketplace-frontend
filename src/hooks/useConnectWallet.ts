import { useContext, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useShallowSelector } from 'hooks';
import { tronSelector } from 'store/selectors';
import { connectTronAction } from 'store/tron/actions';
import { ConnectWalletContext } from 'context';
import { TronStatus } from 'appConstants';

type ReturnValues = {
  handleConnect: (toRedirectAfterAuth?: string) => void,
};

export default function (): ReturnValues {
  const dispatch = useDispatch();
  const { status } = useShallowSelector(tronSelector.getState);
  const { handleOpen } = useContext(ConnectWalletContext);

  const handleConnect = useCallback((toRedirectAfterAuth) => {
    if (status === TronStatus.NOT_AVAILABLE) {
      handleOpen();
      return;
    }
    if (status === TronStatus.AVAILABLE) {
      dispatch(connectTronAction({ meta: toRedirectAfterAuth }));
    }
  }, [status]);

  return {
    handleConnect,
  };
}
