import { Store } from '../../store';

import { setFirstAccessFields } from '../../types/firstAccess/setFirstAccessTypes';
import { addressActions } from '../../actions/addressAction'

import { helpers } from '../validate/validateInput'

export const setFirtAcessHelpers = {
  handleInput,
  validateFullName
}

function validateFullName(value) {
  let validation = (/[a-zA-Z]{2,}\s+[a-zA-Z]/).test(value)
  return validation
}

function handleInput(myValue, target, findedItem, callback) {
  let value = myValue.target ? myValue.target.value : myValue
  let formatted = ''
  switch(target){
    case 'name':
    case 'email':
    case 'Address':
    case 'identificationNumber':
    case 'dateOfBirth':
      return Store.dispatch(saveStore(value, target, setFirstAccessFields.HANDLE_INPUT_CLIENT));
    case 'CEP':
      formatted = value.replace(/[^A-Z0-9]+/ig, "");
      if(formatted.length === 8) Store.dispatch(addressActions.getaddress(formatted, callback))
      return Store.dispatch(saveStore(formatted, target, setFirstAccessFields.HANDLE_ADRESS_CLIENT));
    case 'homePhone':
    case 'CellPhone':
      return Store.dispatch(saveStore(value, target, setFirstAccessFields.HANDLE_INPUT_CLIENT))

    // case 'homePhone':
    // case 'sellerType':
    // case 'fuelType':
    // case 'vehicleColor':
    //   value = findedItem
    //   return Store.dispatch(saveStore(value, target, setFirstAccessFields.HANDLE_INPUT_CLIENT));
    default:
      return
  }
  
  function saveStore(value, target, context) { return { type: context, value, target } }
}