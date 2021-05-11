// Handler
import { typesHouseHandler } from "../../handlers/helpers/typesHouseHandler";
import { TypesHouseActionTypes } from "../../types/helpers/typesHouseTypes";


export const TypesHouseActions = {
	getTypesHouse
};

function getTypesHouse() {
	return dispatch => {
    dispatch(request());
		return typesHouseHandler.getTypesHouse()
			.then(
        response => {
					dispatch(success(response));
          return response;
				},
        error => {
          dispatch(failure(error));
          return false
				}
			).catch(error => {
				dispatch(failure(error));
        return false;
			});
	};

	function request() { return { type: TypesHouseActionTypes.GET_TYPES_HOUSE_REQUEST } }
	function success(response) { return { type: TypesHouseActionTypes.GET_TYPES_HOUSE_SUCCESS, response } }
	function failure(error) { return { type: TypesHouseActionTypes.GET_TYPES_HOUSE_FAILURE, error } }
}