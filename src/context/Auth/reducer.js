import React from 'react';
import jwtDecode from 'jwt-decode'

let user = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).user : ""
let token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).token : ""

export const initialState = {
    userDetails: "" || user,
  token: "" || token,
  loading: false,
  errorMessage: null,
  decodedToken: null,
	isAuthenticated: false,
}

if (localStorage.getItem('token')) {
	const decodedToken = jwtDecode(localStorage.getItem('token'));
	if (decodedToken.exp * 1000 < Date.now()) {
		localStorage.removeItem('token');
		initialState.isAuthenticated = false;
	}else {
    initialState.token = localStorage.getItem('token');
    initialState.decodedToken = decodedToken;
    initialState.isAuthenticated = true;
  }
}
export const AuthReducer = (initialState, action) => {
    switch (action.type) {
      case "REQUEST_LOGIN":
        return {
          ...initialState,
          loading: true
        };
      case "LOGIN_SUCCESS":
        return {
          ...initialState,
        //   user: action.payload.user,
          token: action.payload,
          decodedToken: jwtDecode(action.payload),
          loading: false,
          isAuthenticated: true,
        };

      case "LOGIN_ERROR":
        return {
          ...initialState,
          loading: false,
          errorMessage: action.error,
          isAuthenticated: false,
          decodedToken:null,
        };

        case "REQUEST_REGISTER":
          return {
            ...initialState,
            loading: true
          };
        case "REGISTRATION_SUCCESS":
          return {
            ...initialState,
          //   user: action.payload.user,
            // token: action.payload,
            loading: false
          };

        case "REGISTRATION_ERROR":
          return {
            ...initialState,
            loading: false,
            errorMessage: action.error
          };
        case "LOGOUT":
          return {
            ...initialState,
            user: "",
            token: "",
            isAuthenticated: false,
            decodedToken:null,
          };

      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  };
