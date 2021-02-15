/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Switch, { ReactSwitchProps } from 'react-switch';

export default (props: ReactSwitchProps) => (
  <Switch
    onColor="#86d3ff"
    onHandleColor="#2693e6"
    handleDiameter={20}
    uncheckedIcon={false}
    checkedIcon={false}
    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
    height={14}
    width={34}
    {...props}
  />
);
