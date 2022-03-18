import React from 'react';
import { ThemeProvider } from '@mui/material';

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
      <ParentBox />
    </ThemeProvider>
  );
};

export default App;