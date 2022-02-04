/* eslint-disable react/destructuring-assignment, react/jsx-props-no-spreading */
import React, { FC, useMemo } from 'react';
import cx from 'classnames';
import { useDispatch } from 'react-redux';
import { meSetLangAction } from 'store/me/actions';
import { components } from 'react-select';
import { meSelector } from 'store/selectors';
import { Select } from 'components';
import { LANGUAGE_OPTIONS, LocaleKey } from 'appConstants';
import { useShallowSelector } from 'hooks';
import type { SelectOption } from 'types';
import HeaderLink from '../HeaderLink';
import styles from './styles.module.scss';

type Props = {
  className: string,
};

const HeaderLanguageSwitcher: FC<Props> = ({
  className,
}) => {
  const dispatch = useDispatch();
  const language = useShallowSelector(meSelector.getProp('language'));
  const currentLangOption: SelectOption = useMemo(() => {
    const target = LANGUAGE_OPTIONS.find((el) => el.value === language);
    if (target) return target;
    return LANGUAGE_OPTIONS[0];
  }, [language]);

  return (
    <Select
      options={LANGUAGE_OPTIONS}
      value={currentLangOption}
      controlShouldRenderValue={false}
      className={cx(styles.menu, className)}
      placeholder=""
      components={{
        Control: (props) => (
          <components.Control {...props} className={styles.control}>
            <HeaderLink
              to="#"
              icon="lang"
              isActive={props.menuIsOpen}
              text={currentLangOption.label}
              onClick={(e) => e.preventDefault()}
            >
              {props.children}
            </HeaderLink>
          </components.Control>
        ),
        Menu: (props) => (
          <components.Menu {...props} />
        ),
        Option: ((props) => (
          <components.Option {...props} className={styles.option}>
            {props.children}
          </components.Option>
        )),
        DropdownIndicator: () => null,
      }}
      onChange={(value) => {
        dispatch(meSetLangAction((value as SelectOption).value as LocaleKey));
      }}
    />
  );
};

export default HeaderLanguageSwitcher;
