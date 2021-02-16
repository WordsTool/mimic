import * as React from 'react';
import * as ReactDOM from 'react-dom';
import addDom from './utils/addDom';
import Theme from './components/Theme';
import Tail from './components/Tail';
import FontStyle from './styles/fonts';
import Panel from './components/content/Panel';
import dictionaries from './dictionaries';

const MimicContent = () => {
  const [hidden, toggleHidden] = React.useState(false);
  const [pinned, togglePinned] = React.useState(true);

  return (
    <Theme>
      <FontStyle />
      <Panel
        hidden={hidden}
        toggleHidden={() => toggleHidden(!hidden)}
        pinned={pinned}
        togglePinned={() => togglePinned(!pinned)}
        dictionaries={dictionaries.map(({ name }) => ({
          name,
          active: Math.random() < 0.5,
          onPressNew: () => {},
          onPress: () => {},
        }))}
      />
      <Tail onClick={() => toggleHidden(!hidden)} />
    </Theme>
  );
};

ReactDOM.render((<MimicContent />), addDom());
