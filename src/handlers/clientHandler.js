// Helpers
import { apiGatewayPrefix } from "../helpers/prefixApi";
import { apiHelpers } from "../helpers/apiHelpers";

export const clientHandler = {
  getClient,
  createClient
};

function getClient(email) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(apiGatewayPrefix.concat(`/client/${email}`), requestOptions)
    .then(apiHelpers.handleStatus)
    .then(apiHelpers.handleResponse);
};

function createClient(params) {
  const requestOptions = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  };
  return fetch(apiGatewayPrefix.concat("/client"), requestOptions)
    .then(apiHelpers.handleStatus)
    .then(apiHelpers.handleResponse);
};