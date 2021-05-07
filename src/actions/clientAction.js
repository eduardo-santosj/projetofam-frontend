// Handler
import { clientHandler } from "../handlers/clientHandler";
import { ClientActionTypes } from "../types/clientTypes";


export const clientActions = {
  createClient,
	getClient
};

function createClient(params, callback) {
	return dispatch => {
    dispatch(request());
		return clientHandler.createClient(params)
			.then(
        response => {
					dispatch(success(response));
          if (callback) callback(response);
          return response;
				},
        error => {
          dispatch(failure(error));
          callback(error);
          return false
				}
			).catch(error => {
				dispatch(failure(error));
				callback(error);
        return false;
			});
	};

	function request() { return { type: ClientActionTypes.CREATE_CLIENT_REQUEST } }
	function success(response) { return { type: ClientActionTypes.CREATE_CLIENT_SUCCESS, response } }
	function failure(error) { return { type: ClientActionTypes.CREATE_CLIENT_FAILURE, error } }
}

function getClient(params, callback) {
	return dispatch => {
    dispatch(request());
		return clientHandler.getClient(params)
			.then(
        response => {
					dispatch(success(response));
          if (callback) callback(response);
          return response;
				},
        error => {
          dispatch(failure(error));
					if (callback) callback(error);
          return false
				}
			).catch(error => {
				dispatch(failure(error));
				if (callback) callback(error);
        return false;
			});
	};

	function request() { return { type: ClientActionTypes.GET_CLIENT_BY_ID_REQUEST } }
	function success(response) { return { type: ClientActionTypes.GET_CLIENT_BY_ID_SUCCESS, response } }
	function failure(error) { return { type: ClientActionTypes.GET_CLIENT_BY_ID_FAILURE, error } }
}