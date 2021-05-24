// Helpers
import { apiGatewayPrefix } from "../helpers/prefixApi";
import { apiHelpers } from "../helpers/apiHelpers";

export const petHandler = {
  createPet,
  getPetUserId,
  getPets,
  getPet,
  getImage,
  uploadImage
};

function createPet(params) {
  const requestOptions = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  };
  return fetch(apiGatewayPrefix.concat(`/pets`), requestOptions)
    .then(apiHelpers.handleStatus)
    .then(apiHelpers.handleResponse);
};

function getPetUserId(params) {
  const requestOptions = {
    method: "GET"
  };
  return fetch(apiGatewayPrefix.concat(`/petsUser/${params}`), requestOptions)
    .then(apiHelpers.handleStatus)
    .then(apiHelpers.handleResponse);
};

function getPets() {
  const requestOptions = {
    method: "GET"
  };
  return fetch(apiGatewayPrefix.concat(`/pets`), requestOptions)
    .then(apiHelpers.handleStatus)
    .then(apiHelpers.handleResponse);
};

function getPet(params) {
  const requestOptions = {
    method: "GET"
  };
  return fetch(apiGatewayPrefix.concat(`/pets/${params}`), requestOptions)
    .then(apiHelpers.handleStatus)
    .then(apiHelpers.handleResponse);
};

function getImage(params) {
  const requestOptions = {
    method: "GET"
  };
  return fetch(apiGatewayPrefix.concat(`/image/${params}`), requestOptions)
    .then(apiHelpers.handleStatus)
    .then(apiHelpers.handleResponse);
};

function uploadImage(params) {
  const formData = new FormData()
  formData.append('file', params.file, params.name)
  const requestOptions = {
    method: "POST",
    body: formData
  };
  return fetch(apiGatewayPrefix.concat("/image"), requestOptions)
    .then(apiHelpers.handleStatus)
    .then(apiHelpers.handleResponse);
};