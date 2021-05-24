import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk";

//importRedux
import { ClientReducer } from './reducers/clientReducer'
import { FullReducer } from './reducers/fullReducer'
import { LoginReducer } from './reducers/loginReducer'
import { OngReducer } from './reducers/ongReducer'
import { InfosReducer } from './reducers/helper/infosReducer'
import { PetReducer } from './reducers/petReducer'

const Reducers = combineReducers({
  ClientReducer,
  FullReducer,
  LoginReducer,
  OngReducer,
  PetReducer,
  InfosReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const Store = createStore(
    Reducers,
    composeEnhancer(applyMiddleware(thunk))
);