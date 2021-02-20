import * as React from 'react';
import styled from 'styled-components';
import Typography from '../base/Typography';
import Switch from '../base/Switch';
import PositionControl from './PositionControl';
import Divider from '../base/Divider';
import EventCommonSetting = mimic.popup.EventCommonSetting;
import UIType = mimic.UIType;

const Form = styled.div`
  padding: 12px 20px;
`;

const FormItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

const FormItemDescription = styled.div`
  
`;

const FormItemControl = styled.div``;

type SettingsPropsType = {
  data: { disabled: boolean, ui: UIType },
  onChange: (e: EventCommonSetting) => void
};

const Settings = ({ data: { disabled, ui }, onChange }: SettingsPropsType) => (
  <Form>
    <FormItem>
      <FormItemDescription>
        <Typography variant="subtitle1">
          Disable search panel
        </Typography>
      </FormItemDescription>
      <FormItemControl>
        <Switch
          checked={!disabled}
          onChange={() => {
            onChange({ name: 'disabled', value: !disabled });
          }}
        />
      </FormItemControl>
    </FormItem>
    <Divider />
    <FormItem>
      <FormItemDescription>
        <Typography variant="subtitle1">
          Position for tail and panel
        </Typography>
        <Typography variant="caption">
          Position for tail and panel
        </Typography>
      </FormItemDescription>
      <FormItemControl>
        <PositionControl
          ui={ui}
          onChange={(value: UIType) => {
            onChange({ name: 'ui', value });
          }}
        />
      </FormItemControl>
    </FormItem>
    <Divider />
    <FormItem>
      <FormItemDescription>
        <Typography variant="subtitle1">
          Dark theme
        </Typography>
      </FormItemDescription>
      <FormItemControl>
        <Switch
          checked={ui.theme === 'dark'}
          onChange={() => {
            onChange({
              name: 'ui',
              value: {
                ...ui,
                theme: ui.theme === 'dark' ? 'light' : 'dark',
              },
            });
          }}
        />
      </FormItemControl>
    </FormItem>
  </Form>
);

export default Settings;
