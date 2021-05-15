// Handler
import { ongHandler } from "../handlers/ongHandler";
import { ClientActionTypes } from "../types/clientTypes";


export const ongActions = {
  createOng,
	updateOng,
	getOng
};

function createOng(params, callback) {
	return dispatch => {
    dispatch(request());
		return ongHandler.createOng(params)
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

	function request() { return { type: ClientActionTypes.CREATE_ONG_REQUEST } }
	function success(response) { return { type: ClientActionTypes.CREATE_ONG_SUCCESS, response } }
	function failure(error) { return { type: ClientActionTypes.CREATE_ONG_FAILURE, error } }
}

function updateOng(idUpdate, params,  callback) {
	return dispatch => {
    dispatch(request());
		return ongHandler.updateOng(idUpdate, params)
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

	function request() { return { type: ClientActionTypes.CREATE_ONG_REQUEST } }
	function success(response) { return { type: ClientActionTypes.CREATE_ONG_SUCCESS, response } }
	function failure(error) { return { type: ClientActionTypes.CREATE_ONG_FAILURE, error } }
}

function getOng(params, callback) {
	return dispatch => {
    dispatch(request());
		return ongHandler.getOng(params)
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

	function request() { return { type: ClientActionTypes.GET_ONG_BY_ID_REQUEST } }
	function success(response) { return { type: ClientActionTypes.GET_ONG_BY_ID_SUCCESS, response } }
	function failure(error) { return { type: ClientActionTypes.GET_ONG_BY_ID_FAILURE, error } }
}