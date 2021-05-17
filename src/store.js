import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk";

//importRedux
import { ClientReducer } from './reducers/clientReducer'
import { FullReducer } from './reducers/fullReducer'
import { LoginReducer } from './reducers/loginReducer'
import { OngReducer } from './reducers/ongReducer'
import { InfosReducer } from './reducers/helper/infosReducer'

const Reducers = combineReducers({
  ClientReducer,
  FullReducer,
  LoginReducer,
  OngReducer,
  InfosReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const Store = createStore(
    Reducers,
    composeEnhancer(applyMiddleware(thunk))
);