import React, { useState } from 'react';

export const MessageContext = React.createContext({
  status: null,
  message: null,
  setMessage: () => {},
  clearMessage: () => {}
});

export const MessageStore = props => {
  const { children } = props;

  const clearMessage = () => {
    setState({
      ...state,
      message: null,
      status: null
    });
  };

  const setMessage = (status, message) => { 
        setState({
            ...state,
            message: message,
            status: status,
        })
        setTimeout(
            function () {
                clearMessage() 
            }
        , 5000)
        
    }



  const [state, setState] = useState({
    status: null,
  message: null,
  setMessage,
  clearMessage,
  });

  return <MessageContext.Provider value={state}>{children}</MessageContext.Provider>;
};
