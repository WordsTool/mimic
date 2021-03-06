import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import addDom from './utils/addDom';
import ContentApp from './components/content/ContentApp';
import Messenger, { ContextType } from './core/Messenger';
import ContentInitialDataType = mimic.ContentInitialDataType;
import ContentTabSettingsType = mimic.ContentTabSettingsType;
import CommonSettingsType = mimic.CommonSettingsType;

const messenger = new Messenger({});

const Root = () => {
  const [data, setData] = useState<ContentInitialDataType | null>(null);

  const syncData = useRef(data);

  syncData.current = data;

  useEffect(
    () => {
      messenger.addListener({
        type: 'sync_tab_common_settings',
        controller: (ctx: ContextType<CommonSettingsType>) => {
          setData({ ...syncData.current, ...ctx.data });
        },
      });
      messenger.request<ContentInitialDataType>('get_tab_settings', {}, (res) => {
        setData(res);
      });
    },
    [],
  );

  const syncTabData = (newSyncData: ContentTabSettingsType) => {
    messenger.request('update_tab_settings', newSyncData);
  };

  const openInNew = (url: string) => {
    messenger.request('open_in_new_tab', { url });
  };

  if (!data || data.disabled) return null;

  return (<ContentApp {...data} syncTabData={syncTabData} openInNew={openInNew} />);
};

if (!document.getElementById('mimic_dictionary')) {
  render((<Root />), addDom('mimic_dictionary'));
}
