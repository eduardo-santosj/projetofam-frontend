// Helpers
import { apiGatewayPrefix } from "../../helpers/prefixApi";
import { apiHelpers } from "../../helpers/apiHelpers";

export const genderHandler = {
  getGender
};

function getGender() {
  const requestOptions = {
    method: "GET",
  };
  return fetch(apiGatewayPrefix.concat(`/gender`), requestOptions)
    .then(apiHelpers.handleStatus)
    .then(apiHelpers.handleResponse);
};
