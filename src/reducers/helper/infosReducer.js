import { GenderActionTypes } from '../../types/helpers/genderTypes';
import { TypesHouseActionTypes } from '../../types/helpers/typesHouseTypes';

const initialState = {
  createInfosReducer: {
    genders: {
      loading: false,
      genderList: []
    },
    typesHouses: {
      loading: false,
      typesHouseList: []
    },
    ImageListPet: {
      loading: false,
      imagePet: []
    }
  }
};

export const InfosReducer = (state = initialState, action) => {
  switch (action.type) {
    case GenderActionTypes.GET_GENDER_REQUEST:
      return {
        ...state,
        createInfosReducer: {...state.createInfosReducer, genders: {...state.createInfosReducer.genderList, loading: true }},
      };
    case GenderActionTypes.GET_GENDER_SUCCESS:
      return {
        ...state,
        createInfosReducer: {...state.createInfosReducer, genders: { loading: false, genderList: action.response.genderList } }
      };
    case GenderActionTypes.GET_GENDER_FAILURE:
      return {
        ...state,
        createInfosReducer: {...state.createInfosReducer, genders: {...state.createInfosReducer.genderList, loading: false }},
      };

    case TypesHouseActionTypes.GET_TYPES_HOUSE_REQUEST:
      return {
        ...state,
        createInfosReducer: {...state.createInfosReducer, typesHouses: {...state.createInfosReducer.typesHouseList, loading: true } },
      };
    case TypesHouseActionTypes.GET_TYPES_HOUSE_SUCCESS:
      return {
        ...state,
        createInfosReducer: {...state.createInfosReducer, typesHouses: { loading: false, typesHouseList: action.response.typesHouseList } },
      };
    case TypesHouseActionTypes.GET_TYPES_HOUSE_FAILURE:
      return {
        ...state,
        createInfosReducer: {...state.createInfosReducer, typesHouses: {...state.createInfosReducer.typesHouseList, loading: false } },
      };

    case TypesHouseActionTypes.GET_IMAGE_PET_REQUEST:
      return {
        ...state,
        createInfosReducer: {...state.createInfosReducer, ImageListPet: {...state.createInfosReducer.ImageListPet, loading: true } },
      };
    case TypesHouseActionTypes.GET_IMAGE_PET_SUCCESS:
      return {
        ...state,
        createInfosReducer: {...state.createInfosReducer, ImageListPet: { loading: false, ImageListPet: action.response.typesHouseList } },
      };
    case TypesHouseActionTypes.GET_IMAGE_PET_FAILURE:
      return {
        ...state,
        createInfosReducer: {...state.createInfosReducer, ImageListPet: {...state.createInfosReducer.ImageListPet, loading: false } },
      };
    
    default:
      return state;
  }
};