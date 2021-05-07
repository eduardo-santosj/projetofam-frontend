import { LoginActionTypes } from '../types/loginTypes';

const initialState = {
  LogginReducerParams: {
    client: {
      isLogged: false,
      email: '',
      name: '',
      finalizeRegistration: false
    },
    message: '',
    isLoading: false,
  },
};

export const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LoginActionTypes.CREATE_LOGIN_REQUEST:
      return {
        ...state,
        LogginReducerParams: {...state.LogginReducerParams, isLoading: true}
      };
    case LoginActionTypes.CREATE_LOGIN_SUCCESS:
      return {
        ...state,
        LogginReducerParams: {...state.LogginReducerParams, client: {isLogged: action.response.success, email: action.response.data.email, name: action.response.data.name, finalizeRegistration: action.response.data.finalizeRegistration }, isLoading: false}
      };
    case LoginActionTypes.CREATE_LOGIN_FAILURE:
      return {
        ...state,
        LogginReducer: {...state.LogginReducerParams, isLoading: false}
      };
    default:
      return state;
  }
};