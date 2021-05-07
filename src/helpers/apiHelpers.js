export const apiHelpers = {
	handleStatus,
	handleResponse
}

function handleStatus(response) {
	if (response.ok) {
		return Promise.resolve(response);
	}
	return Promise.reject(response.json());
}

function handleResponse(response) {
	return response.json();
}

