import * as React from 'react';
import * as ReactDOM from 'react-dom';
import addDom from './utils/addDom';
import Theme from './components/Theme';
import Tail from './components/Tail';
import FontStyle from './styles/fonts';
import Panel from './components/content/Panel';
import dictionaries from './dictionaries';

const MimicContent = () => {
  const [hidden, toggleHidden] = React.useState(true);
  const [pinned, togglePinned] = React.useState(false);

  return (
    <Theme>
      <FontStyle />
      <Panel
        position="left"
        isHidden={hidden}
        toggleHidden={() => toggleHidden(true)}
        pinned={pinned}
        togglePinned={() => togglePinned(!pinned)}
        dictionaries={dictionaries.map(({ name }) => ({
          name,
          active: Math.random() < 0.5,
          onPressNew: () => {},
          onPress: () => {},
        }))}
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
