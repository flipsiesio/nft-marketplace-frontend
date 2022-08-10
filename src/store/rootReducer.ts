import { connectRouter } from 'connected-react-router';
import { history } from 'utils';

import me from 'store/me/reducer';
import ui from 'store/ui/reducer';
import nftMarket from 'store/nftMarket/reducer';
import wallet from 'store/wallet/reducer';

export default {
  router: connectRouter(history),
  me,
  ui,
  nftMarket,
  wallet,
};
