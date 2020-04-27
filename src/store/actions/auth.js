import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  }
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const checkAuthExpiration = (expiringTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, 3600000000);
  }
}
export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    const API_KEY = 'AIzaSyB1g40ZhuAVzUgTMCQsmXKcxQnU3Py84L0';
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

    if (!isSignUp) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
    }

    axios.post(url, authData)
      .then(response => {
        console.log(response.data);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        // dispatch(checkAuthExpiration(response.data.expiresIn));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail());
      });
  }
}

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  }
}
