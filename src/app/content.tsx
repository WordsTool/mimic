import * as React from 'react';
import * as ReactDOM from 'react-dom';
import addDom from './utils/addDom';
import Theme from './components/Theme';
import Tail from './components/Tail';
import FontStyle from './styles/fonts';
import Panel from './components/content/Panel';
import dictionaries from './dictionaries';
import useCurrentLocation from './components/content/useLocation';
import MainInput from './components/content/MainInput';
import getDictionaryUrl from './utils/getDictionaryUrl';

const MimicContent = () => {
  const [hidden, toggleHidden] = React.useState(true);
  const [pinned, togglePinned] = React.useState(false);
  const [phrase, setPhrase] = React.useState('');

  const location = useCurrentLocation();

  const active = React.useMemo(
    () => dictionaries.find(({ url }) => url.indexOf(location.host) !== -1),
    [location],
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
        position="left"
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

ReactDOM.render((<MimicContent />), addDom('mimic_dictionary'));
