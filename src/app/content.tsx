import * as React from 'react';
import * as ReactDOM from 'react-dom';
import addDom from './utils/addDom';
import Theme from './components/Theme';
import Tail from './components/Tail';
import FontStyle from './styles/fonts';
import Panel from './components/content/Panel';
import useCurrentLocation from './components/content/useLocation';
import MainInput from './components/content/MainInput';
import getDictionaryUrl from './utils/getDictionaryUrl';
import useIsMounted from './components/common/useIsMounted';

const extensionId = chrome.runtime.id;

type InitialRequest = { method: 'get', type: 'initial' };
type InitialResponse = {
  dictionaries: Dictionary[], pinned: boolean, phrase: string };

const request = (message: any): Promise<InitialResponse> => new Promise(
  (resolve) => {
    chrome.runtime.sendMessage(extensionId, message, {}, (response) => {
      resolve(response);
    });
  },
);

const getInitialData = (): Promise<InitialResponse> => request(
  { method: 'get', type: 'initial' },
);

const syncTabData = (data: { phrase: string, pinned: boolean }): Promise<any> => request(
  { method: 'update', data },
);

const MimicContent = (props: { data: InitialResponse }) => {
  const { data: { dictionaries, pinned: initialPinned, phrase: initialPhrase } } = props;
  const [hidden, toggleHidden] = React.useState(initialPinned);
  const [pinned, togglePinned] = React.useState<boolean>(initialPinned);
  const [phrase, setPhrase] = React.useState<string>(initialPhrase);

  const isMounted = useIsMounted();

  const location = useCurrentLocation();

  const active = React.useMemo(
    () => dictionaries.find(({ url }) => url.indexOf(location.host) !== -1),
    [location],
  );

  React.useEffect(
    () => {
      if (isMounted) {
        syncTabData({ pinned, phrase });
      }
    },
    [phrase, pinned],
  );

  const panelDictionaries = React.useMemo(() => dictionaries.map(({ name, url }) => ({
    name,
    url,
    active: active && active.name === name,
  })), [dictionaries, location]);

  const onPressItem = React.useCallback(
    (url: string) => {
      window.location.href = getDictionaryUrl(url, phrase);
    },
    [phrase],
  );
  const onPressItemNew = React.useCallback(
    (url: string) => {
      window.open(getDictionaryUrl(url, phrase), '_blank');
    },
    [phrase],
  );

  return (
    <Theme>
      <FontStyle />
      <Panel
        position="right"
        isHidden={hidden}
        toggleHidden={() => toggleHidden(true)}
        pinned={pinned}
        togglePinned={() => togglePinned(!pinned)}
        dictionaries={panelDictionaries}
        onPressItem={onPressItem}
        onPressItemNew={onPressItemNew}
        mainInput={(
          <MainInput onChange={setPhrase} value={phrase} />
        )}
      />
      <Tail
        isHidden={hidden}
        onClick={() => toggleHidden(false)}
        position={{ vertical: 'center', horizontal: 'right' }}
      />
    </Theme>
  );
};

getInitialData()
  .then((data) => {
    ReactDOM.render((<MimicContent data={data} />), addDom('mimic_dictionary'));
  })
  .catch((error) => {
    console.error(error);
  });
