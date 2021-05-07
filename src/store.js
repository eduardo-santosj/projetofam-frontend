import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk";

//importRedux
import { ClientReducer } from './reducers/clientReducer'
import { LoginReducer } from './reducers/loginReducer'

const reducer = combineReducers({
  ClientReducer,
  LoginReducer
})

const store = createStore(
  reducer,
  compose(
    applyMiddleware(
      thunk
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
)

export default store;