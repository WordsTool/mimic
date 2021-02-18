import * as React from 'react';
import styled from 'styled-components';
import Typography from '../base/Typography';
import Switch from '../base/Switch';
import PositionControl from './PositionControl';
import EventCommonSetting = mimic.popup.EventCommonSetting;
import UIPosition = mimic.UIPosition;

const Form = styled.div`
`;

const FormItem = styled.div`
`;

type SettingsPropsType = {
  data: { disabled: boolean, ui: UIPosition },
  onChange: (e: EventCommonSetting) => void
};

const Settings = ({ data: { disabled, ui }, onChange }: SettingsPropsType) => (
  <Form>
    <FormItem>
      <Typography variant="subtitle1">
        Disable search panel
      </Typography>
      <Switch
        checked={!disabled}
        onChange={() => {
          onChange({ name: 'disabled', value: !disabled });
        }}
      />
      <Typography variant="subtitle1">
        Position for tail and panel
      </Typography>
      <Typography variant="body2">
        Position for tail and panel
      </Typography>
      <PositionControl
        ui={ui}
        onChange={(value: UIPosition) => {
          onChange({ name: 'ui', value });
        }}
      />
    </FormItem>
  </Form>
);

export default Settings;
