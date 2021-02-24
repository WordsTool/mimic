import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import Messenger from './core/Messenger';
import PopupApp from './components/popup/PopupApp';
import UpdateCommonSettings = mimic.UpdateCommonSettings;
import CommonSettingsWithConfig = mimic.CommonSettingsWithConfig;

const messenger = new Messenger({
  listen: [],
});

const Root = () => {
  const [commonSettings, setCommonSettings] = useState<null | CommonSettingsWithConfig>(null);

  const requestSettings = () => {
    messenger.request<CommonSettingsWithConfig>('get_common_settings', {}, (response) => {
      setCommonSettings(response);
    });
  };

  useEffect(
    () => {
      requestSettings();
    },
    [],
  );
  const onChangeSettings = ({ name, value }: { name: 'disabled', value: boolean }) => {
    setCommonSettings({ ...commonSettings, [name]: value });

    messenger.request<any, UpdateCommonSettings>('update_common_settings', { [name]: value });
  };

  const resetDefault = () => {
    messenger.request<CommonSettingsWithConfig>('reset_common_settings', {}, () => {
      requestSettings();
    });
  };

  if (!commonSettings) return null;

  return (
    <PopupApp
      {...commonSettings}
      onChangeSettings={onChangeSettings}
      onReset={resetDefault}
    />
  );
};

render(<Root />, document.getElementById('root'));
