import * as React from 'react';
import * as ReactDOM from 'react-dom';

import SortableList from './components/popup/SortableList';
import FontStyle from './styles/fonts';
import 'rc-tabs/assets/index.css';

import dictionaries from './dictionaries';
import Theme from './components/Theme';
import PopupLayout from './components/popup/PopupLayout';
import Settings from './components/popup/Settings';
import Help from './components/popup/Help';

const Popup = () => (
  <Theme>
    <FontStyle />
    <PopupLayout
      settings={(
        <Settings />
      )}
      dictionaries={(
        <SortableList list={dictionaries} />
      )}
      help={(
        <Help />
      )}
    />
  </Theme>
);

ReactDOM.render(<Popup />, document.getElementById('root'));
