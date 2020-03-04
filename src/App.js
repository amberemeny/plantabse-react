import React from 'react';
import {
  MuiThemeProvider,
} from '@material-ui/core/styles';
import theme from './styles/index'
import Router from './route/Router'
import { AuthStore } from './utils/Authorization';
import { GlobalStore } from './utils/globalContext';
import { MessageStore } from './utils/messageContext'

export default function App() {

  return (
    <AuthStore>
      <GlobalStore>
        <MessageStore>
      <MuiThemeProvider theme={theme}>
        <Router />
      </MuiThemeProvider>
        </MessageStore>
      </GlobalStore>
    </AuthStore>
  );
}

