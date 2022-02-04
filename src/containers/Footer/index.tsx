import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Text } from 'components';
import { routes } from 'appConstants';
import FooterSocialLinks from './FooterSocilaLinks';
import styles from './styles.module.scss';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>

        <p className={styles.text}>
          {t('footer.text')}
        </p>

        <div className={styles.wrap}>
          <FooterSocialLinks />
          <div className={styles.info}>
            <Link
              to={routes.termsOfServices.root}
              className={styles.link}
            >
              {t('termsOfServices.title')}
            </Link>
            <div className={styles.copyrightWrap}>
              <Text tag="span" className={styles.copyright} size="tiny" color="gray">{t('footer.copyright')} © 2020 Flipsies. {t('footer.reserved')}.</Text>
              <Text tag="span" bold color="primary" size="tiny">flipsies.io</Text>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
