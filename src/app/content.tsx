import * as React from 'react';
import * as ReactDOM from 'react-dom';
import addDom from './utils/addDom';
import Theme from './components/Theme';
import Tail from './components/Tail';
import FontStyle from './styles/fonts';
import Panel from './components/content/Panel';
import dictionaries from './dictionaries';

const MimicContent = () => (
  <Theme>
    <FontStyle />
    <Panel
      dictionaries={dictionaries.map(({ name }) => ({
        name,
        active: Math.random() < 0.5,
        onPressNew: () => {},
        onPress: () => {},
      }))}
    />
    <Tail />
  </Theme>
);

ReactDOM.render((<MimicContent />), addDom());
