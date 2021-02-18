import React from 'react';
import Theme from '../Theme';
import FontStyle from '../../styles/fonts';
import PopupLayout from './PopupLayout';
import Settings from './Settings';
import SortableList from './SortableList';
import dictionaries from '../../dictionaries';
import Help from './Help';
import 'rc-tabs/assets/index.css';
import CommonSettingsType = mimic.CommonSettingsType;

type PopupAppPropsType = CommonSettingsType & { onChangeSettings: (e: { name: 'disabled', value: boolean }) => void };

const PopupApp = ({ ui, disabled, onChangeSettings }: PopupAppPropsType) => (
  <Theme>
    <FontStyle />
    <PopupLayout
      settings={(
        <Settings
          onChange={onChangeSettings}
          data={{ disabled, ui }}
        />
      )}
      dictionaries={(
        <SortableList list={dictionaries} />
      )}
      help={(
        <Help />
      )}
    />
  </Theme>
);

export default PopupApp;
