import { ClientActionTypes } from '../types/clientTypes';
import { setFirstAccessFields } from "../types/firstAccess/setFirstAccessTypes";

const initialState = {
  createClientReducer: {
    client: {
      name: '',
      email: '',
      dateOfBirth: '',
      identificationNumber: '',
      gender: {
        name: '',
        id: '',
      },
      phone: {
        cellPhone: '',
        homePhone: '',
      },
      Address: {
        CEP: '',
        street: '',
        number: '',
        complement: '',
        neighbourhood: '',
        state: '',
        type: '',
        city: '',
      },
      isOng: false,
      alreadyAdopted: false,
      howManyAdopted: ''
    },
    isLoading: false,
  }
};

export const ClientReducer = (state = initialState, action) => {
  switch (action.type) {
    case ClientActionTypes.CREATE_CLIENT_REQUEST:
      return {
        ...state,
        createClientReducer: {...state.createClientReducer, isLoading: true },
      };
    case ClientActionTypes.CREATE_CLIENT_SUCCESS:
      return {
        ...state,
        createClientReducer: {...state.createClientReducer, clients: action.response, isLoading: false },
      };
    case ClientActionTypes.CREATE_CLIENT_FAILURE:
      return {
        ...state,
        createClientReducer: {...state.createClientReducer, clients: state.createClientReducer.clients, isLoading: false },
      };
    
    case ClientActionTypes.GET_CLIENT_BY_ID_REQUEST:
      return {
        ...state,
        createClientReducer: {...state.createClientReducer, client: state.createClientReducer.client, isLoading: true },
      };
    case ClientActionTypes.GET_CLIENT_BY_ID_SUCCESS:
      return {
        ...state,
        createClientReducer: {...state.createClientReducer, client: action.response.data, isLoading: false },
      };
    case ClientActionTypes.GET_CLIENT_BY_ID_FAILURE:
      return {
        ...state,
        createClientReducer: {...state.createClientReducer, client: state.createClientReducer.client, isLoading: false },
      };

    case setFirstAccessFields.HANDLE_INPUT_CLIENT:
      return { ...state, createClientReducer: {...state.createClientReducer, client: {...state.createClientReducer.client, [action.target]: action.value  }}};
    
    case setFirstAccessFields.HANDLE_ADRESS_CLIENT:
      return { ...state, createClientReducer: {...state.createClientReducer, client: {...state.createClientReducer.client, Address: {...state.createClientReducer.client.Address, [action.target]: action.value }}}};

    case setFirstAccessFields.HANDLE_PHONE_CLIENT:
      return { ...state, createClientReducer: {...state.createClientReducer, client: {...state.createClientReducer.client, phone: {...state.createClientReducer.client.phone, [action.target]: action.value }}}};
    default:
      return state;
  }
};