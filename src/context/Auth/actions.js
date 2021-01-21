import {toast} from 'react-toastify'

// const API_URL = 'https://oja-oba-service.herokuapp.com'
const {REACT_APP_API_URL} = process.env;

export const loginUser = async (dispatch, loginPayload) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(loginPayload),
    }

    try {
        dispatch({type: 'REQUEST_LOGIN'})
        const request = await fetch(`${REACT_APP_API_URL}/v1/user/login`, options)
        const response = await request.json()
        if (response.status === "SUCCESS") {
            dispatch({type: 'LOGIN_SUCCESS', payload: response.data})
            localStorage.setItem('token', JSON.stringify(response.data));
            return response
        } else {
            dispatch({type: 'LOGIN_ERROR', payload: response.description})
            return response;
        }

        //at this point we are supposed to use the the token gotten, decode it
        //and get the user details. but because we do not need the user details
        //there is no need making the extra network call

    } catch (error) {

        dispatch({type: 'LOGIN_ERROR', payload: error.message})
    }
}
export const registerUser = async (dispatch, loginPayload) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...loginPayload, email: loginPayload.username}),
    }

    try {
        dispatch({type: 'REQUEST_LOGIN'})
        const request = await fetch(`${REACT_APP_API_URL}/v1/user`, options)
        const response = await request.json()
        if (response.status === "SUCCESS") {
            dispatch({type: 'LOGIN_SUCCESS', payload: response.data})
            return response
        } else {
            dispatch({type: 'LOGIN_ERROR', payload: response.description})
            return response;
        }
    } catch (error) {

        dispatch({type: 'LOGIN_ERROR', payload: error.message})
    }
}

export const logout = (dispatch) => {
    dispatch({type: 'LOGOUT'})
    localStorage.removeItem('token');
}
