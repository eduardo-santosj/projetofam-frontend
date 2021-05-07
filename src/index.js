import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import {Provider} from 'react-redux'
import { Router } from 'react-router-dom';
import { history } from './helpers/history';
import { Store } from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./app.css"


ReactDOM.render(
  <Provider store={Store}>
     <Router history={history}>
      <App />
     </Router>
   </Provider>,
   document.getElementById('root')
)