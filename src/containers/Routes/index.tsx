import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { routes } from 'appConstants';
import { ProtectedRoute } from 'containers';
import {
  Main,
  NotFound,
  TermsOfServices,
  NftMarketPage,
  MarketCardProfilePage,
  GalleryCardProfilePage,
  MyGalleryCardProfilePage, ExplorePage,
} from 'pages';
import styles from './styles.module.scss';

const Routes = () => {
  const location = useLocation();

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.key}
        classNames={{
          enter: styles.fadeEnter,
          enterActive: styles.fadeEnterActive,
        }}
        timeout={{
          exit: 0,
          enter: 250,
        }}
      >
        <Switch>
          <Route path={routes.main.root} exact component={Main} />
          <ProtectedRoute
            exact
            path={routes.nftMarket.root}
            component={NftMarketPage}
          />

          <Route path={routes.notFound.root} component={NotFound} />
          <Route path={routes.termsOfServices.root} component={TermsOfServices} />

          <Route path={routes.nftMarket.marketProfile.root} component={MarketCardProfilePage} />
          <Route path={routes.nftMarket.galleryProfile.root} component={GalleryCardProfilePage} />
          <Route
            path={routes.nftMarket.myGalleryProfile.root}
            component={MyGalleryCardProfilePage}
          />
          <Route path={routes.explore.root} component={ExplorePage} />
          <Redirect from="*" to={routes.notFound.root} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Routes;
