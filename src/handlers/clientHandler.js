// Helpers
import { apiGatewayPrefix } from "../helpers/prefixApi";
import { apiHelpers } from "../helpers/apiHelpers";

export const clientHandler = {
  getClient,
  createClient,
  updateClient,
  updatePreClient,
  getFull,
  getFullId
};

function getClient(email) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(apiGatewayPrefix.concat(`/client/${email}`), requestOptions)
    .then(apiHelpers.handleStatus)
    .then(apiHelpers.handleResponse);
};

function getFull(email) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(apiGatewayPrefix.concat(`/full/${email}`), requestOptions)
    .then(apiHelpers.handleStatus)
    .then(apiHelpers.handleResponse);
};

function getFullId(email) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(apiGatewayPrefix.concat(`/fullid/${email}`), requestOptions)
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

function updateClient(idUpdate, params) {
  const requestOptions = {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  };
  return fetch(apiGatewayPrefix.concat(`/client/${idUpdate}`), requestOptions)
    .then(apiHelpers.handleStatus)
    .then(apiHelpers.handleResponse);
};

function updatePreClient(idUpdate, params) {
  const requestOptions = {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  };
  return fetch(apiGatewayPrefix.concat(`/preclient/${idUpdate}`), requestOptions)
    .then(apiHelpers.handleStatus)
    .then(apiHelpers.handleResponse);
};