import { GenderActionTypes } from '../../types/helpers/genderTypes';
import { TypesHouseActionTypes } from '../../types/helpers/typesHouseTypes';

const initialState = {
  createInfosReducer: {
    genderList: {},
    typesHouseList: {},
  }
};

export const InfosReducer = (state = initialState, action) => {
  switch (action.type) {
    case GenderActionTypes.GET_GENDER_REQUEST:
      return {
        ...state,
        createInfosReducer: {...state.createInfosReducer, isLoading: true },
      };
    case GenderActionTypes.GET_GENDER_SUCCESS:
      return {
        ...state,
        createInfosReducer: {...state.createInfosReducer, genderList: action.response.genderList, isLoading: false },
      };
    case GenderActionTypes.GET_GENDER_FAILURE:
      return {
        ...state,
        createInfosReducer: {...state.createInfosReducer, genderList: state.createInfosReducer.genderList, isLoading: false },
      };

    case TypesHouseActionTypes.GET_TYPES_HOUSE_REQUEST:
      return {
        ...state,
        createInfosReducer: {...state.createInfosReducer, isLoading: true },
      };
    case TypesHouseActionTypes.GET_TYPES_HOUSE_SUCCESS:
      return {
        ...state,
        createInfosReducer: {...state.createInfosReducer, typesHouseList: action.response.typesHouseList, isLoading: false },
      };
    case TypesHouseActionTypes.GET_TYPES_HOUSE_FAILURE:
      return {
        ...state,
        createInfosReducer: {...state.createInfosReducer, typesHouseList: state.createInfosReducer.typesHouseList, isLoading: false },
      };
    
    default:
      return state;
  }
};