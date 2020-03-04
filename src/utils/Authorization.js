import React, { useState } from 'react';

export const AuthContext = React.createContext({
  user: null,
  isAuthenticated: false,
  setUser: () => {},
  clearUser: () => {},
});

export const AuthStore = props => {
  const { children } = props;
  const setUser = user => {
    setState({
      ...state,
      user,
      isAuthenticated: Boolean(user),
    });
  };

  const clearUser = () => {
    setState({
      ...state,
      user: null,
      isAuthenticated: false,
    });
  };

  const [state, setState] = useState({
    user: null,
    isAuthenticated: false,
    setUser,
    clearUser,
  });

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
