import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk";

//importRedux
import { ClientReducer } from './reducers/clientReducer'
import { LoginReducer } from './reducers/loginReducer'

const Reducers = combineReducers({
  ClientReducer,
  LoginReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const Store = createStore(
    Reducers,
    composeEnhancer(applyMiddleware(thunk))
);