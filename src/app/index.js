import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { PrivateRouter } from '../components/privateRouter'


import { NavBar, Footer } from '../components'
import { HomePage, ClientsList, ClientsInsert, ClientsUpdate, LoginPage, WhoAre, FirstAccess, OngCreate, MySpace, CreatePet, ViewPet, AboutAdoption, Contact } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    if (window.performance) {
        if (performance.navigation.type === 1) {
            window.localStorage.removeItem("user");
        }
      }
    return (
        <Router>
            
            <NavBar />
            <div className="fixed-menu" id="fixedBehavior"></div>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>
                    <Route path="/home" exact component={HomePage}/>
                    <Route path="/clients/list" exact component={ClientsList} />
                    <Route path="/clients/create" exact component={ClientsInsert} />
                    <Route path="/login" exact component={LoginPage}/>
                    <Route path="/who-are" exact component={WhoAre}/>
                    <Route path="/about-adoption" exact component={AboutAdoption}/>
                    <Route path="/contact" exact component={Contact}/>
                    <PrivateRouter path="/first-access" exact component={FirstAccess}/>
                    <PrivateRouter path="/my-space" exact component={MySpace}/>
                    <Route path="/creat-ong" exact component={OngCreate}/>
                    <PrivateRouter path="/creat-pet" exact component={CreatePet}/>
                    <Route path="/view-pet/:id" exact component={ViewPet}/>
                    <Route
                        path="/clients/update/:id"
                        exact
                        component={ClientsUpdate}
                    />
                </Switch>
            <Footer />
        </Router>
    )
}

export default App