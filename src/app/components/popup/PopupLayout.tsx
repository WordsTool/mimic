import * as React from 'react';
import styled from 'styled-components';
import Tabs, { TabPane } from 'rc-tabs';
import { getStyle } from '../base/Typography';
import PoweredBy from '../common/PoweredBy';

type PopupLayoutPropsType = {
  settings: React.ReactNode,
  dictionaries: React.ReactNode,
  help: React.ReactNode,
};

const Container = styled.div`
  width: 420px;
  height: 380px;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.surface.main};
  .rc-tabs {
    border: none;
    display: flex;
    flex: 1;
  }
  .rc-tabs-tabpane{
    outline: none;
  }
  .rc-tabs-content-holder {
    display: flex;
    flex: 1;
    overflow: auto;
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
    color: ${({ theme }) => theme.palette.text.main};
    line-height: 52px;
    text-align: center;
    flex: 1;
    outline: none;
  }
`;

const Footer = styled.div`
  height: 52px;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.palette.surface.dark};
  flex-direction: row;
  align-items: center;
  display: flex;
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
      <Footer>
        <PoweredBy size="small" />
      </Footer>
    </Container>
  );
};

export default PopupLayout;
