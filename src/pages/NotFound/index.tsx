import React from 'react';
import { H4, H1, Button } from 'components';
import { routes } from 'appConstants';
import { history } from 'utils';
import photo from 'assets/img/404.svg';
import styles from './styles.module.scss';

const NotFound = () => (
  <div className={styles.main}>
    <H1 className={styles.title}>404</H1>
    <H4 color="gray" className={styles.text}>Sorry, the page is not found</H4>
    <Button
      use="rounded"
      size="big"
      className={styles.link}
      onClick={() => history.push(routes.main.root)}
    >
      Back to the main page
    </Button>

    <img src={photo} className={styles.photo} alt="Not Found" />
  </div>
);

export default NotFound;
