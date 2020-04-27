import * as actionType from "../actions/actionTypes";
import { updatedObject } from "../utility";

const initialState = {
  token: null,
  userId: null,
  error: false,
  loading: false,
  authRedirectPath: '/',
};

const authStart = (state, action) => {
  return updatedObject(state, {
    error: null,
    loading: true
  });
};

const authFail = (state, action) => {
  return updatedObject(state, {
    error: action.error,
    loading: false
  });
};

const authSuccess = (state, action) => {
  console.log('authSuccess', action);
  return updatedObject(state, {
    error: null,
    loading: false,
    token: action.idToken,
    userId: action.userId,
  });
};

const authLogout = (state, action) => {
  return updatedObject(state, {
    token: null,
    userId: null,
  });
};

const setAuthRedirectPath = (state, action) => {
  return updatedObject(state, {
    authRedirectPath: action.path
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_START: return authStart(state, action);
    case actionType.AUTH_SUCCESS: return authSuccess(state, action);
    case actionType.AUTH_FAIL: return authFail(state, action);
    case actionType.AUTH_LOGOUT: return authLogout(state, action);
    case actionType.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
    default: return state;
  }
};

export default reducer;
