// Helpers
import { apiGatewayPrefix } from "../helpers/prefixApi";
import { apiHelpers } from "../helpers/apiHelpers";

export const ongHandler = {
  getOng,
  createOng,
  updateOng
};

function getOng(email) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(apiGatewayPrefix.concat(`/ongs/${email}`), requestOptions)
    .then(apiHelpers.handleStatus)
    .then(apiHelpers.handleResponse);
};

function createOng(params) {
  const requestOptions = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  };
  return fetch(apiGatewayPrefix.concat("/ongs"), requestOptions)
    .then(apiHelpers.handleStatus)
    .then(apiHelpers.handleResponse);
};

function updateOng(idUpdate, params) {
  const requestOptions = {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  };
  return fetch(apiGatewayPrefix.concat(`/ongs/${idUpdate}`), requestOptions)
    .then(apiHelpers.handleStatus)
    .then(apiHelpers.handleResponse);
};
