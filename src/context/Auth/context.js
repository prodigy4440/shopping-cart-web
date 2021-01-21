import React, {useReducer} from "react";
import { AuthReducer, initialState } from './reducer';

export const AuthStateContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [user, dispatch] = useReducer(AuthReducer, initialState);

    return (
      <AuthStateContext.Provider value={{user,dispatch}}>
          {children}
      </AuthStateContext.Provider>
    );
  };
