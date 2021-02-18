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
  height: 48px;
  line-height: 48px;
  border: 0;
  border-radius: 6px;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  background-color: #fff;
  margin: -2px;
  :focus {
    border-color: ${({ theme }) => theme.palette.secondary.main};
  }
`;

const MainInput = ({ onChange, value }: { value: string, onChange: (phrase: string) => void }) => {
  const handleChange = ({ target: { value: newValue } }: React.ChangeEvent<HTMLInputElement>) => {
    onChange(newValue);
  };

  return (
    <InputWrapper>
      <InputField
        value={value}
        autoComplete="on"
        placeholder="Enter phrase"
        onChange={handleChange}
      />
    </InputWrapper>
  );
};

export default MainInput;
