import { Store } from '../../store';

import { setFirstAccessFields } from '../../types/firstAccess/setFirstAccessTypes';
import { addressActions } from '../../actions/addressAction'


export const setOngsHelpers = {
  handleInput
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
    case 'password':
      return Store.dispatch(saveStore(value, target, setFirstAccessFields.HANDLE_INPUT_ONG));
    case 'gender':
      value = findedItem.id
      return Store.dispatch(saveStore(value, target, setFirstAccessFields.HANDLE_INPUT_ONG));
    // Phone
    case 'homePhone':
    case 'cellPhone':
      formatted = value.replace(/[^A-Z0-9]/ig,'');
      return Store.dispatch(saveStore(formatted, target, setFirstAccessFields.HANDLE_PHONE_ONG))
    // Address
    case 'zipcode':
      formatted = value.replace(/[^A-Z0-9]+/ig, "");
      if(formatted.length === 8) Store.dispatch(addressActions.getaddress(formatted, callback))
      return Store.dispatch(saveStore(formatted, target, setFirstAccessFields.HANDLE_ADRESS_ONG));
    case 'type':
      value = findedItem.id
      return Store.dispatch(saveStore(value, target, setFirstAccessFields.HANDLE_ADRESS_ONG));
    case 'number':
    case 'complement':
      return Store.dispatch(saveStore(value, target, setFirstAccessFields.HANDLE_ADRESS_ONG));
    default:
      return
  }
  
  function saveStore(value, target, context) { return { type: context, value, target } }
}