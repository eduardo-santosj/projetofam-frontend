import { Store } from '../../store';

import { setFirstAccessFields } from '../../types/firstAccess/setFirstAccessTypes';

export const setPetInfos = {
  handleInput
}

function handleInput(myValue, target, findedItem, callback) {
  let value = myValue.target ? myValue.target.value : myValue
  let formatted = ''
  switch(target){
    case 'name':
    case 'old':
    case 'castration':
    case 'vaccination':
    case 'infos_pet':
    case 'breed':
    case 'color':
    case 'type':
    case 'gender':
    case 'images':
      return Store.dispatch(saveStore(value, target, setFirstAccessFields.HANDLE_INPUT_PET));
    
    case 'reset':
      return Store.dispatch(saveStore(value, target, setFirstAccessFields.HANDLE_RESET_INPUT_PET));
    default:
      return
  }
  
  function saveStore(value, target, context) { return { type: context, value, target } }
}