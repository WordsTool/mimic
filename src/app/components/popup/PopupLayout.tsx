import * as React from 'react';
import styled from 'styled-components';
import Tabs, { TabPane } from 'rc-tabs';
import { getStyle } from '../base/Typography';

type PopupLayoutPropsType = {
  settings: React.ReactNode,
  dictionaries: React.ReactNode,
  help: React.ReactNode,
};

const Container = styled.div`
  width: 420px;
  height: 340px;
  background-color: ${({ theme }) => theme.palette.paper.main};
  .rc-tabs {
    border: none;
  }
  .rc-tabs-tab,.rc-tabs-nav-list {
    flex: 1;
    background: none; 
  } 
  .rc-tabs-ink-bar{
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
  .rc-tabs-tab-btn{
    ${getStyle('button')}
    color: ${({ theme }) => theme.palette.text.primary};
    line-height: 48px;
    text-align: center;
    flex: 1;
    outline: none;
  }
`;

const PopupLayout = (props: PopupLayoutPropsType) => {
  const { settings, dictionaries, help } = props;

  return (
    <Container>
      <Tabs>
        <TabPane tab="Settings" key="1">
          {settings}
        </TabPane>
        <TabPane tab="Dictionaries" key="2">
          {dictionaries}
        </TabPane>
        <TabPane tab="Help" key="3">
          {help}
        </TabPane>
      </Tabs>
    </Container>
  );
};

export default PopupLayout;
