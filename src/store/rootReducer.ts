import { connectRouter } from 'connected-react-router';
import { history } from 'utils';

import me from 'store/me/reducer';
import ui from 'store/ui/reducer';
import tron from 'store/tron/reducer';
import nftMarket from 'store/nftMarket/reducer';

export default {
  router: connectRouter(history),
  me,
  ui,
  tron,
  nftMarket,
};
