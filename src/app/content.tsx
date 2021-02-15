import * as React from 'react';
import * as ReactDOM from 'react-dom';
import addDom from './utils/addDom';
import Theme from './components/Theme';
import Tail from './components/Tail';
import FontStyle from './styles/fonts';
import Panel from './components/content/Panel';

const MimicContent = () => (
  <Theme>
    <FontStyle />
    <Panel />
    <Tail />
  </Theme>
);

ReactDOM.render((<MimicContent />), addDom());
