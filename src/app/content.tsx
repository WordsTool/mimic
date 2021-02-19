import React, { useEffect, useState } from 'react';
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

  useEffect(
    () => {
      messenger.addListener({
        type: 'sync_tab_common_settings',
        controller: (ctx: ContextType<CommonSettingsType>) => {
          setData({ ...data, ...ctx.data });
        },
      });
      messenger.request<ContentInitialDataType>('get_tab_settings', {}, (res) => {
        setData(res);
      });
    },
    [],
  );

  const syncTabData = (syncData: ContentTabSettingsType) => {
    messenger.request('update_tab_settings', syncData);
  };

  const openInNew = (url: string) => {
    messenger.request('open_in_new_tab', { url });
  };

  if (!data || data.disabled) return null;

  return (<ContentApp {...data} syncTabData={syncTabData} openInNew={openInNew} />);
};

render((<Root />), addDom('mimic_dictionary'));
