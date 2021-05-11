// Helpers
import { apiGatewayPrefix } from "../../helpers/prefixApi";
import { apiHelpers } from "../../helpers/apiHelpers";

export const typesHouseHandler = {
  getTypesHouse
};

function getTypesHouse() {
  const requestOptions = {
    method: "GET",
  };
  return fetch(apiGatewayPrefix.concat(`/types`), requestOptions)
    .then(apiHelpers.handleStatus)
    .then(apiHelpers.handleResponse);
};
