import React from 'react'
import {Container} from 'react-bootstrap'
import MyNavbar from './Navbar.js'
import Introduction from './Introduction.js'
import Feedback from './Feedback.js'
import About from './About.js'
import App from '../app/App.js'
import {BrowerRouter as Router, Switch, Route} from 'react-router-dom'

import * as Redux from 'redux';
import {Provider} from 'react-redux'
import {enterKey, update} from '../app/enterKey.js'
import {enterStat, statUpdater} from '../app/statUpdater.js'
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
                </Container>
            </Switch>
            </div>
            )
}

const combineReducer = Redux.combineReducers({update,statUpdater,setPrompt})
const store = Redux.createStore(combineReducer);

export default () => (
    <Provider store={store}>
      <Home />
    </Provider>)
