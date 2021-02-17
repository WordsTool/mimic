import * as React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  padding: 0;
  position: relative;
`;

const InputField = styled.input`
  position: relative;
  width: 100%;
  padding: 0;
  text-indent: 12px;
  font-size: 16px;
  outline: none;
  height: 42px;
  line-height: 42px;
  border: 0;
  border-radius: 4px;
`;

const Border = styled.div<{ focus: boolean }>`
  background-color: ${({ theme }) => theme.palette.secondary.light};
  transition: opacity 0.2s ease-in-out;
  opacity: ${({ focus }) => (focus ? 1 : 0)};
  position: absolute;
  left: -2px;
  top: -2px;
  padding: 2px;
  width: 100%;
  height: 100%;
  border-radius: 6px;
`;

const MainInput = ({ onChange, value }: { value: string, onChange: (phrase: string) => void }) => {
  const [focus, toggleFocus] = React.useState(false);

  const handleChange = ({ target: { value: newValue } }: React.ChangeEvent<HTMLInputElement>) => {
    onChange(newValue);
  };

  return (
    <InputWrapper>
      <Border focus={focus} />
      <InputField
        value={value}
        placeholder="Enter phrase"
        onFocus={() => toggleFocus(true)}
        onBlur={() => toggleFocus(false)}
        onChange={handleChange}
      />
    </InputWrapper>
  );
};

export default MainInput;
