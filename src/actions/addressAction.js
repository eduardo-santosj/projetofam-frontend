import { addressHandler } from "../handlers/addressHandler";
import { addressActionTypes } from "../types/address/addressTypes";


export const addressActions = {
  getaddress
};

function getaddress(params, callback) {
	return dispatch => {
    dispatch(request());
		return addressHandler.getaddress(params)
			.then(
        response => {
					dispatch(success(response));
          callback(response)
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

	function request() { return { type: addressActionTypes.GET_ADDRESS_REQUEST } }
	function success(response) { return { type: addressActionTypes.GET_ADDRESS_SUCCESS, response } }
	function failure(error) { return { type: addressActionTypes.GET_ADDRESS_FAILURE, error } }
}