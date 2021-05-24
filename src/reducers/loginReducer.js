import { LoginActionTypes } from '../types/loginTypes';

const initialState = {
  LogginReducerParams: {
    client: {
      isLogged: false,
      email: '',
      name: '',
      id:'',
      finalizeRegistration: false,
      typeAccess: ''
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
        LogginReducerParams: {...state.LogginReducerParams, client: {isLogged: action.response.success, email: action.response.data.email,id:action.response.data.id, name: action.response.data.name, finalizeRegistration: action.response.data.finalizeRegistration, typeAccess: action.response.data.typeAccess }, isLoading: false}
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