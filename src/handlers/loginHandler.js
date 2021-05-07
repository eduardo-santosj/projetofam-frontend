// Helpers
import { apiGatewayPrefix } from "../helpers/prefixApi";
import { apiHelpers } from "../helpers/apiHelpers";

export const loginHandler = {
  loginClient
};

function loginClient(params) {
  const requestOptions = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  };
  console.log(apiGatewayPrefix);
  debugger
  return fetch(apiGatewayPrefix.concat("/login"), requestOptions)
    .then(apiHelpers.handleStatus)
    .then(apiHelpers.handleResponse);
};