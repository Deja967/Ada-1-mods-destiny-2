import React from 'react';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-notchedOutline {
    border-color: red;
    border-radius: 15px !important;
    border-image: linear-gradient(45deg, #ba17d7, #d025ae) 10;
  }
  & .MuiInputBase-input {
    color: white;
  }
`;

export const CustomTextField = ({ placeholder }) => {
  return (
    <StyledTextField
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
