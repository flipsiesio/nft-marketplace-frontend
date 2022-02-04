import React, { CSSProperties } from 'react';
import { storiesOf } from '@storybook/react';
import Icon from '.';

const style: CSSProperties = {
  fontSize: '22px',
  margin: '0 10px 10px 0',
};

storiesOf('Basic', module).add('Icon', () => (
  <>
    <Icon icon="faq" style={style} />
    <Icon icon="question" style={style} />
    <Icon icon="wallet" style={style} />
    <Icon icon="lang" style={style} />
    <Icon icon="cancel" style={style} />
    <Icon icon="checkmark" style={style} />
    <Icon icon="twitter" style={style} />
    <Icon icon="facebook" style={style} />
    <Icon icon="instagram" style={style} />
    <Icon icon="chevron" style={style} />
    <Icon icon="referral" style={style} />
    <Icon icon="article" style={style} />
    <Icon icon="pencil" style={style} />
    <Icon icon="peoples" style={style} />
    <Icon icon="star" style={style} />
    <Icon icon="cash" style={style} />
    <Icon icon="copy" style={style} />
    <Icon icon="moneybag" style={style} />
    <Icon icon="hourglass" style={style} />
    <Icon icon="cards" style={style} />
    <Icon icon="sad" style={style} />
    <Icon icon="medal" style={style} />
    <Icon icon="back-link" style={style} />
  </>
));
