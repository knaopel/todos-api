import React from 'react';
import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';

import { theme } from '../../../util';

import './App.css';
import ParentBox from '../ParentBox/ParentBox';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={4}>
        <ParentBox />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;