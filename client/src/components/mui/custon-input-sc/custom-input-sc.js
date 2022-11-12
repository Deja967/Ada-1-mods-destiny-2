import React from 'react';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

const StyledInputField = styled(TextField)`
  & .MuiInputBase-input {
    border-color: red;
  }
`;

export const CustomTextField = ({ placeholder }) => {
  return (
    <StyledInputField
      type='text'
      spacing={4}
      variant='outlined'
      label={placeholder}
      required='true'
      size='small'
      sx={{
        label: { color: 'white' },
      }}
    />
  );
};
