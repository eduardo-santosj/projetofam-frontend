import { ClientActionTypes } from '../types/clientTypes';
import { setFirstAccessFields } from "../types/firstAccess/setFirstAccessTypes";

const initialState = {
  createFullReducer: {
    full: {
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
        zipcode: '',
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
      howManyAdopted: '',
      typeAccess: ''
    },
    clientResponse: {

    },
    isLoading: false,
  }
};

export const FullReducer = (state = initialState, action) => {
  switch (action.type) {
    case ClientActionTypes.GET_FULL_BY_ID_REQUEST:
      return {
        ...state,
        createFullReducer: {...state.createFullReducer, full: state.createFullReducer.full, isLoading: true },
      };
    case ClientActionTypes.GET_FULL_BY_ID_SUCCESS:
      debugger
      return {
        ...state,
        createFullReducer: {...state.createFullReducer, full: action.response.data, isLoading: false },
      };
    case ClientActionTypes.GET_FULL_BY_ID_FAILURE:
      return {
        ...state,
        createFullReducer: {...state.createFullReducer, full: state.createFullReducer.full, isLoading: false },
      };

    case setFirstAccessFields.HANDLE_INPUT_FULL:
      return { ...state, createFullReducer: {...state.createFullReducer, full: {...state.createFullReducer.full, [action.target]: action.value  }}};
    
    case setFirstAccessFields.HANDLE_ADRESS_FULL:
      return { ...state, createFullReducer: {...state.createFullReducer, full: {...state.createFullReducer.full, Address: {...state.createFullReducer.full.Address, [action.target]: action.value }}}};

    case setFirstAccessFields.HANDLE_PHONE_FULL:
      return { ...state, createFullReducer: {...state.createFullReducer, full: {...state.createFullReducer.full, phone: {...state.createFullReducer.full.phone, [action.target]: action.value }}}};
    default:
      return state;
  }
};