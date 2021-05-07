import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import { NavBar } from '../components'
import { HomePage, ClientsList, ClientsInsert, ClientsUpdate, LoginPage, WhoAre, FirstAccess } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <div className="fixed-menu" id="fixedBehavior"></div>
                <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/clients/list" exact component={ClientsList} />
                    <Route path="/clients/create" exact component={ClientsInsert} />
                    <Route path="/login" exact component={LoginPage}/>
                    <Route path="/who-are" exact component={WhoAre}/>
                    <Route path="/first-access" exact component={FirstAccess}/>
                    <Route
                        path="/clients/update/:id"
                        exact
                        component={ClientsUpdate}
                    />
                </Switch>
        </Router>
    )
}

export default App