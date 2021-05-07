// Handler
import { loginHandler } from "../handlers/loginHandler";
import { LoginActionTypes } from "../types/loginTypes";


export const loginActions = {
  loginClient
};

function loginClient(params, callback) {
	return dispatch => {
    dispatch(request());
		return loginHandler.loginClient(params)
			.then(
        response => {
					dispatch(success(response));
					localStorage.setItem('user', JSON.stringify(response))
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

	function request() { return { type: LoginActionTypes.CREATE_LOGIN_REQUEST } }
	function success(response) { return { type: LoginActionTypes.CREATE_LOGIN_SUCCESS, response } }
	function failure(error) { return { type: LoginActionTypes.CREATE_LOGIN_FAILURE, error } }
}