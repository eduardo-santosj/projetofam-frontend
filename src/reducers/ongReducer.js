import { ClientActionTypes } from '../types/clientTypes';
import { setFirstAccessFields } from "../types/firstAccess/setFirstAccessTypes";

const initialState = {
  createOngReducer: {
    ongs: {
      name: '',
      email: '',
      dateOfBirth: '',
      identificationNumber: '',
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
        city: '',
      },
      howManyAdopted: '',
      password: '',
      typeAccess:''
    },
    ongsResponse: {

    },
    isLoading: false,
  }
};

export const OngReducer = (state = initialState, action) => {
  switch (action.type) {
    case ClientActionTypes.CREATE_ONG_REQUEST:
      return {
        ...state,
        createOngReducer: {...state.createOngReducer, isLoading: true },
      };
    case ClientActionTypes.CREATE_ONG_SUCCESS:
      return {
        ...state,
        createOngReducer: {...state.createOngReducer, ongsResponse: action.response, isLoading: false },
      };
    case ClientActionTypes.CREATE_ONG_FAILURE:
      return {
        ...state,
        createOngReducer: {...state.createOngReducer, ongsResponse: state.createOngReducer.ongsResponse, isLoading: false },
      };
    
    case ClientActionTypes.GET_ONG_BY_ID_REQUEST:
      return {
        ...state,
        createOngReducer: {...state.createOngReducer, ongs: state.createOngReducer.ongs, isLoading: true },
      };
    case ClientActionTypes.GET_ONG_BY_ID_SUCCESS:
      return {
        ...state,
        createOngReducer: {...state.createOngReducer, ongs: action.response.data, isLoading: false },
      };
    case ClientActionTypes.GET_ONG_BY_ID_FAILURE:
      return {
        ...state,
        createOngReducer: {...state.createOngReducer, ongs: state.createOngReducer.ongs, isLoading: false },
      };

    case setFirstAccessFields.HANDLE_INPUT_ONG:
      return { ...state, createOngReducer: {...state.createOngReducer, ongs: {...state.createOngReducer.ongs, [action.target]: action.value  }}};
    
    case setFirstAccessFields.HANDLE_ADRESS_ONG:
      return { ...state, createOngReducer: {...state.createOngReducer, ongs: {...state.createOngReducer.ongs, Address: {...state.createOngReducer.ongs.Address, [action.target]: action.value }}}};

    case setFirstAccessFields.HANDLE_PHONE_ONG:
      return { ...state, createOngReducer: {...state.createOngReducer, ongs: {...state.createOngReducer.ongs, phone: {...state.createOngReducer.ongs.phone, [action.target]: action.value }}}};
    default:
      return state;
  }
};