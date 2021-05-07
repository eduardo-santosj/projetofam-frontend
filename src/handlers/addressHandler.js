// Helpers
import { apiGatewayPrefix } from "../helpers/prefixApi";
import { apiHelpers } from "../helpers/apiHelpers";

export const addressHandler = {
  getaddress
};

function getaddress(cep) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(apiGatewayPrefix.concat(`/address/${cep}`), requestOptions)
    .then(apiHelpers.handleStatus)
    .then(apiHelpers.handleResponse);
};
