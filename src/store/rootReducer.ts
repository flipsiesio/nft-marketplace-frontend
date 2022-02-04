import { connectRouter } from 'connected-react-router';
import { history } from 'utils';

import me from 'store/me/reducer';
import ui from 'store/ui/reducer';
import betsHistory from 'store/betsHistory/reducer';
import trxUsdRate from 'store/trxUsdRate/reducer';
import jackpot from 'store/jackpot/reducer';
import tron from 'store/tron/reducer';
import referral from 'store/referral/reducer';
import game from 'store/game/reducer';
import nftMarket from 'store/nftMarket/reducer';

export default {
  router: connectRouter(history),
  me,
  ui,
  betsHistory,
  trxUsdRate,
  jackpot,
  tron,
  referral,
  game,
  nftMarket,
};
