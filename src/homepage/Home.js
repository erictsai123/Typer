import React from 'react'
import {Container} from 'react-bootstrap'
import MyNavbar from './Navbar.js'
import Introduction from './Introduction.js'
import Feedback from './Feedback.js'
import About from './About.js'
import App from '../app/App.js'
import Account from './Account.js'
import Profile from './Profile.js'
import {Switch, Route} from 'react-router-dom'

import * as Redux from 'redux';
import {Provider} from 'react-redux'
import { update} from '../app/enterKey.js'
import { statUpdater} from '../app/statUpdater.js'
import accountRedux from '../app/accountRedux.js'
import setPrompt from '../app/setPrompt.js'


function Home(){
        
        return(
            <div id='appcontainer' >
            <MyNavbar />
            <Switch>
                <Container id='content' >
                    <Route path= '/' component={Introduction} exact />
                    <Route path='/about' component = {About} />
                    <Route path='/feedback' component= {Feedback} />
                    <Route path='/practice/:lesson?' component= {App} />
                    <Route path='/account' component= {Account} />
                    <Route path='/profile' component={Profile} />
                </Container>
            </Switch>
            </div>
            )
}

const combineReducer = Redux.combineReducers({update,statUpdater,setPrompt,accountRedux})
const store = Redux.createStore(combineReducer);

export default () => (
    <Provider store={store}>
      <Home />
    </Provider>)
