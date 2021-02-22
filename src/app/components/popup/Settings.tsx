import * as React from 'react';
import styled from 'styled-components';
import Typography from '../base/Typography';
import Switch from '../base/Switch';
import PositionControl from './PositionControl';
import Divider from '../base/Divider';
import i18n from '../../utils/i18n';
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
  margin: 0 12px 0 0;
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
          {i18n('popup_settings_show_label')}
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
          {i18n('popup_settings_position_label')}
        </Typography>
        <Typography variant="caption" color="light">
          {i18n('popup_settings_position_caption')}
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
          {i18n('popup_settings_theme_label')}
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
