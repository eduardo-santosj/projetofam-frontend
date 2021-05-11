import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk";

//importRedux
import { ClientReducer } from './reducers/clientReducer'
import { LoginReducer } from './reducers/loginReducer'
import { InfosReducer } from './reducers/helper/infosReducer'

const Reducers = combineReducers({
  ClientReducer,
  LoginReducer, 
  InfosReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const Store = createStore(
    Reducers,
    composeEnhancer(applyMiddleware(thunk))
);