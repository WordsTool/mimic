import * as React from 'react';
import useIsMounted from '../common/useIsMounted';
import useCurrentLocation from './useLocation';
import getDictionaryUrl from '../../utils/getDictionaryUrl';
import Theme from '../Theme';
import FontStyle from '../../styles/fonts';
import Panel from './Panel';
import MainInput from './MainInput';
import Tail from '../Tail';
import ContentInitialDataType = mimic.ContentInitialDataType;
import ContentTabSettingsType = mimic.ContentTabSettingsType;
import Dictionary = mimic.Dictionary;

type ContentAppPropsType = ContentInitialDataType & {
  syncTabData: (syncData: ContentTabSettingsType) => void,
  openInNew: (url: string) => void,
};

const ContentApp = (props: ContentAppPropsType) => {
  const {
    dictionaries,
    pinned: initialPinned,
    phrase: initialPhrase,
    ui,
    syncTabData,
    openInNew,
  } = props;
  const [hidden, toggleHidden] = React.useState(!initialPinned);
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
      if (isMounted && initialPhrase) setPhrase(initialPhrase);
    },
    [initialPhrase],
  );

  React.useEffect(
    () => {
      if (isMounted) {
        syncTabData({ pinned, phrase });
      }
    },
    [phrase, pinned],
  );

  const panelDictionaries = React.useMemo(() => dictionaries.map((dictionary) => ({
    dictionary,
    active: active && active.name === dictionary.name,
  })), [dictionaries, location]);

  const onPressItem = React.useCallback(
    (dictionary: Dictionary) => {
      window.location.href = getDictionaryUrl(dictionary, phrase);
    },
    [phrase],
  );
  const onPressItemNew = React.useCallback(
    (dictionary: Dictionary) => {
      openInNew(getDictionaryUrl(dictionary, phrase));
    },
    [phrase],
  );

  return (
    <Theme theme={ui.theme}>
      <FontStyle />
      <Panel
        position={ui.panel}
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
        position={ui.tail}
      />
    </Theme>
  );
};

export default ContentApp;
