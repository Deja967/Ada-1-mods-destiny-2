import React from 'react';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

const StyledTextFieldPhone = styled(TextField)`
  & .MuiOutlinedInput-notchedOutline {
    border-color: red;
    border-radius: 15px !important;
    border-image: linear-gradient(45deg, #ba17d7, #d025ae) 10;
    margin-left: 37px;
  }
  & .MuiInputBase-input {
    color: white;
    width: 323px;
    margin-left: 40px;
  }
`;

export const CustomTextFieldPhone = ({ placeholder }) => {
  return (
    <StyledTextFieldPhone
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
