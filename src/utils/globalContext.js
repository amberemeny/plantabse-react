import React, { useState } from 'react';
import { getPlants } from './API'

export const GlobalContext = React.createContext({
  userPlants: null,
  setUserPlants: () => {},
  clearContext: () => {},
  errorMessage: {status: null, message: null},
  setErrorMessage: () => {},
});

export const GlobalStore = props => {
  const { children } = props;

  const setUserPlants = () => {
    getPlants()
    .then(res => { 
        if (res.status === 200) {
            res.testmessage = 'Test Complete'
            console.log('recieved plants.')
        }
        return res
    })
    .then(rest => setState({
        ...state,
        userPlants: rest.data
    }))
    .catch(err => console.log(err))
  };

  const setErrorMessage = (status, message) => { 
        setState({
            ...state,
            errorMessage: {status: status, message: message},
        })}

  const clearContext = () => {
    setState({
      ...state,
      userPlants: null
    });
  };

  const [state, setState] = useState({
    userPlants: null,
    setUserPlants,
    clearContext,
    errorMessage: {status: null, message: null},
    setErrorMessage,
  });

  return <GlobalContext.Provider value={state}>{children}</GlobalContext.Provider>;
};
