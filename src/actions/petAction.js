// Handler
import { petHandler } from "../handlers/petHandler";
import { PetActionTypes } from "../types/petTypes";


export const petActions = {
  createPet,
	getPets,
	getPet,
	getPetUserId,
	getImage,
	uploadImage
};

function createPet(params, callback) {
	return dispatch => {
    dispatch(request());
		return petHandler.createPet(params)
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

	function request() { return { type: PetActionTypes.CREATE_PET_REQUEST } }
	function success(response) { return { type: PetActionTypes.CREATE_PET_SUCCESS, response } }
	function failure(error) { return { type: PetActionTypes.CREATE_PET_FAILURE, error } }
}

function getPetUserId(params, callback) {
	return dispatch => {
    dispatch(request());
		return petHandler.getPetUserId(params)
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

	function request() { return { type: PetActionTypes.GET_PET_USER_REQUEST } }
	function success(response) { return { type: PetActionTypes.GET_PET_USER_SUCCESS, response } }
	function failure(error) { return { type: PetActionTypes.GET_PET_USER_FAILURE, error } }
}

function getPets(callback) {
	return dispatch => {
    dispatch(request());
		return petHandler.getPets()
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

	function request() { return { type: PetActionTypes.GET_PETS_REQUEST } }
	function success(response) { return { type: PetActionTypes.GET_PETS_SUCCESS, response } }
	function failure(error) { return { type: PetActionTypes.GET_PETS_FAILURE, error } }
}

function getPet(params, callback) {
	return dispatch => {
    dispatch(request());
		return petHandler.getPet(params)
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

	function request() { return { type: PetActionTypes.GET_PET_REQUEST } }
	function success(response) { return { type: PetActionTypes.GET_PET_SUCCESS, response } }
	function failure(error) { return { type: PetActionTypes.GET_PET_FAILURE, error } }
}

function getImage(params, callback) {
	return dispatch => {
	debugger
	dispatch(request());
		return petHandler.getImage(params)
			.then(
        response => {
					dispatch(success(response));
					console.log('1', response)
          if (callback) callback(response);
          return response;
				},
        error => {
          dispatch(failure(error));
					console.log('2', error)
          if (callback) callback(error);
          return false
				}
			).catch(error => {
				dispatch(failure(error));
				console.log('3', error)
				if (callback) callback(error);
        return false;
			});
	};

	function request() { return { type: PetActionTypes.GET_IMG_PET_REQUEST } }
	function success(response) { return response }
	function failure(error) { return error }
}


function uploadImage(params,  callback) {
	return dispatch => {
    dispatch(request());
		return petHandler.uploadImage(params)
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

	function request() { return { type: PetActionTypes.CREATE_IMG_PET_REQUEST } }
	function success(response) { return { type: PetActionTypes.CREATE_IMG_PET_SUCCESS, response } }
	function failure(error) { return { type: PetActionTypes.CREATE_IMG_PET_FAILURE, error } }
}