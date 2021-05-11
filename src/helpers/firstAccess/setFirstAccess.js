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
    case 'isOng':
    case 'alreadyAdopted':
    case 'howManyAdopted':
      return Store.dispatch(saveStore(value, target, setFirstAccessFields.HANDLE_INPUT_CLIENT));
    case 'gender':
      value = findedItem.id
      return Store.dispatch(saveStore(value, target, setFirstAccessFields.HANDLE_INPUT_CLIENT));
    // Phone
    case 'homePhone':
    case 'cellPhone':
      formatted = value.replace(/[^A-Z0-9]/ig,'');
      return Store.dispatch(saveStore(formatted, target, setFirstAccessFields.HANDLE_PHONE_CLIENT))
    // Address
    case 'CEP':
      formatted = value.replace(/[^A-Z0-9]+/ig, "");
      if(formatted.length === 8) Store.dispatch(addressActions.getaddress(formatted, callback))
      return Store.dispatch(saveStore(formatted, target, setFirstAccessFields.HANDLE_ADRESS_CLIENT));
    case 'type':
      value = findedItem.id
      return Store.dispatch(saveStore(value, target, setFirstAccessFields.HANDLE_ADRESS_CLIENT));
    case 'number':
    case 'complement':
      return Store.dispatch(saveStore(value, target, setFirstAccessFields.HANDLE_ADRESS_CLIENT));
    default:
      return
  }
  
  function saveStore(value, target, context) { return { type: context, value, target } }
}