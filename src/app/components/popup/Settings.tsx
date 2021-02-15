import * as React from 'react';
import styled from 'styled-components';
import Typography from '../base/Typography';
import Switch from '../base/Switch';

const Form = styled.div`
`;

const FormItem = styled.div`
`;

const Settings = () => (
  <Form>
    <FormItem>
      <Typography variant="subtitle1">
        Disable search panel
      </Typography>
      <Switch checked onChange={() => {}} />
    </FormItem>
  </Form>
);

export default Settings;
