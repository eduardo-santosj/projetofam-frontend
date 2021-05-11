// Handler
import { genderHandler } from "../../handlers/helpers/genderHandler";
import { GenderActionTypes } from "../../types/helpers/genderTypes";


export const GenderActions = {
	getGender
};

function getGender() {
	return dispatch => {
    dispatch(request());
		return genderHandler.getGender()
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

	function request() { return { type: GenderActionTypes.GET_GENDER_REQUEST } }
	function success(response) { return { type: GenderActionTypes.GET_GENDER_SUCCESS, response } }
	function failure(error) { return { type: GenderActionTypes.GET_GENDER_FAILURE, error } }
}