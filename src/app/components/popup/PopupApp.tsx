import React from 'react';
import Theme from '../Theme';
import FontStyle from '../../styles/fonts';
import PopupLayout from './PopupLayout';
import Settings from './Settings';
import SortableList from './SortableList';
import dictionaries from '../../dictionaries';
import Help from './Help';
import 'rc-tabs/assets/index.css';
import CommonSettingsWithConfig = mimic.CommonSettingsWithConfig;

type PopupAppPropsType = CommonSettingsWithConfig & {
  onChangeSettings: (e: { name: 'disabled', value: boolean }) => void
};

const PopupApp = ({
  ui, disabled, onChangeSettings, dictionariesConfig,
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
    />
  </Theme>
);

export default PopupApp;
