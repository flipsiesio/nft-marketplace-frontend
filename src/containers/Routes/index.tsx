import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';
import { routes } from 'appConstants';
import { ProtectedRoute } from 'containers';
import {
  Main,
  NotFound,
  TermsOfServices,
  NftMarketPage,
  MarketCardProfilePage,
  GalleryCardProfilePage,
  MyGalleryCardProfilePage,
  ExplorePage,
  MyBidsCardProfilePage,
  NftEarningSystemPage,
} from 'pages';
import { NftView } from 'pages/NftView';

const Routes = () => {
  const location = useLocation();

  return (
    <Switch location={location}>
      <Route path={routes.main.root} exact component={Main} />
      <ProtectedRoute
        exact
        path={routes.nftMarket.root}
        component={NftMarketPage}
        checkAccess
      />

      <Route path={routes.notFound.root} component={NotFound} />
      <Route path={routes.termsOfServices.root} component={TermsOfServices} />
      <Route path={routes.nftView.root} component={NftView} />

      <ProtectedRoute
        path={routes.nftMarket.marketProfile.root}
        component={MarketCardProfilePage}
        checkAccess
      />
      <ProtectedRoute
        path={routes.nftMarket.galleryProfile.root}
        component={GalleryCardProfilePage}
        checkAccess
      />
      <ProtectedRoute
        path={routes.nftMarket.myGalleryProfile.root}
        component={MyGalleryCardProfilePage}
        checkAccess
      />
      <ProtectedRoute
        path={routes.nftMarket.myBidsProfile.root}
        component={MyBidsCardProfilePage}
        checkAccess
      />
      <Route path={routes.explore.root} component={ExplorePage} />
      <Route path={routes.nftEarningSystem.root} component={NftEarningSystemPage} />
      <Redirect from="*" to={routes.notFound.root} />
    </Switch>
  );
};

export default Routes;
