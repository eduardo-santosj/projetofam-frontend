import { PetActionTypes } from '../types/petTypes';
import { setFirstAccessFields } from "../types/firstAccess/setFirstAccessTypes";

const initialState = {
  createPetReducer: {
    pets: {
      name: '',
      type: '',
      old: '',
      gender: '',
      breed: '',
      color: '',
      castration: false,
      vaccination: false,
      infos_pet: '',
      images: [],
      ong: '',
      user: ''
    },
    petsResponse: {
      data:[]
    },
    isLoading: false,
  }
};

export const PetReducer = (state = initialState, action) => {
  switch (action.type) {
    case PetActionTypes.CREATE_PET_REQUEST:
      return {
        ...state,
        createPetReducer: {...state.createPetReducer, isLoading: true },
      };
    case PetActionTypes.CREATE_PET_SUCCESS:
      return {
        ...state,
        createPetReducer: {...state.createPetReducer, petsResponse: action.response, isLoading: false },
      };
    case PetActionTypes.CREATE_PET_FAILURE:
      return {
        ...state,
        createPetReducer: {...state.createPetReducer, petsResponse: state.createPetReducer.petsResponse, isLoading: false },
      };

    case PetActionTypes.GET_PET_USER_REQUEST:
      return {
        ...state,
        createPetReducer: {...state.createPetReducer, isLoading: true },
      };
    case PetActionTypes.GET_PET_USER_SUCCESS:
      return {
        ...state,
        createPetReducer: {...state.createPetReducer, petsResponse: action.response, isLoading: false },
      };
    case PetActionTypes.GET_PET_USER_FAILURE:
      return {
        ...state,
        createPetReducer: {...state.createPetReducer, petsResponse: state.createPetReducer.petsResponse, isLoading: false },
      };

    case PetActionTypes.GET_PETS_REQUEST:
    return {
      ...state,
      createPetReducer: {...state.createPetReducer, isLoading: true },
    };
    case PetActionTypes.GET_PETS_SUCCESS:
      return {
        ...state,
        createPetReducer: {...state.createPetReducer, petsResponse: action.response, isLoading: false },
      };
    case PetActionTypes.GET_PETS_FAILURE:
      return {
        ...state,
        createPetReducer: {...state.createPetReducer, petsResponse: state.createPetReducer.petsResponse, isLoading: false },
      };

    case PetActionTypes.GET_PET_REQUEST:
      return {
        ...state,
        createPetReducer: {...state.createPetReducer, isLoading: true },
      };
    case PetActionTypes.GET_PET_SUCCESS:
      return {
        ...state,
        createPetReducer: {...state.createPetReducer, pets: action.response.data, isLoading: false },
      };
    case PetActionTypes.GET_PET_FAILURE:
      return {
        ...state,
        createPetReducer: {...state.createPetReducer, pets: state.createPetReducer.pets, isLoading: false },
      };

    case setFirstAccessFields.HANDLE_INPUT_PET:
      return { ...state, createPetReducer: {...state.createPetReducer, pets: {...state.createPetReducer.pets, [action.target]: action.value  }}};
    
    case setFirstAccessFields.HANDLE_RESET_INPUT_PET:
      return { ...state, createPetReducer: {...state.createPetReducer, pets: initialState.createPetReducer.pets }};
      
    default:
      return state;
  }
};