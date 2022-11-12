// import { createTheme } from '@mui/material/styles';
import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';

const StyledButton = styled(Button)`
  & .MuiButton-contained {
    background: 'linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)';
    color: white;
    margin-top: 50px;
    height: 40px;
  }
`;

export const CustomButton = () => {
  return <StyledButton variant='contained' fullWidth={true} />;
};

// const customTheme = createTheme({
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           '&.MuiButton-containedPrimary': {
//             padding: '9px',
//             backGround: 'linear-gradient'('45deg', '#ba17d7', '#d025ae'),
//             textTransform: 'none',
//             marginTop: '12px',
//             height: '35px',
//             textAlign: 'center',
//             borderRadius: '6px',
//             boxShadow: 'none',
//             fontWeight: 'bold',
//             cursor: 'pointer',
//           },
//         },
//       },
//     },
//   },
// });

// export default customTheme;
