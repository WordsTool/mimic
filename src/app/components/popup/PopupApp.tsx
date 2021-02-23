import React, { FunctionComponent } from 'react';
import Theme from '../Theme';
import FontStyle from '../../styles/fonts';
import PopupLayout from './PopupLayout';
import Settings from './Settings';
import SortableList from './SortableList';
import ContactUs from './contactUs/ContactUs';
import Help from './Help';
import 'rc-tabs/assets/index.css';
import CommonSettingsWithConfig = mimic.CommonSettingsWithConfig;

type PopupAppPropsType = CommonSettingsWithConfig & {
  onChangeSettings: (e: { name: 'disabled', value: boolean }) => void
};

const PopupApp: FunctionComponent<PopupAppPropsType> = ({
  ui, disabled, onChangeSettings, dictionariesConfig, dictionaries,
}: PopupAppPropsType) => (
  <Theme theme={ui.theme}>
    <FontStyle />
    <PopupLayout
      settings={(
        <Settings
          onChange={onChangeSettings}
          data={{ disabled, ui }}
        />
      )}
      dictionaries={(
        <SortableList
          list={dictionaries}
          config={dictionariesConfig}
          onChange={onChangeSettings}
        />
      )}
      help={(
        <Help />
      )}
      contact={(
        <ContactUs />
      )}
    />
  </Theme>
);

export default PopupApp;
