import React from 'react';
import {
  MuiThemeProvider,
} from '@material-ui/core/styles';
import theme from './styles/index'
import Router from './route/Router'
import { UserProvider } from './globalState'

export default function App() {
  const user = { name: 'Tania', loggedIn: true }

  return (

    <UserProvider value={user}>
      <MuiThemeProvider theme={theme}>
        <Router />
      </MuiThemeProvider>
    </UserProvider>
    
  );
}

