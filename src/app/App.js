import React,{useState,setState} from 'react';
import * as ReactRedux from 'react-redux'
import * as ReduxThunk from 'redux-thunk'
import {Row, Col, Tab,Tabs} from 'react-bootstrap'


import Render from './Render.js'
import Stats from './Stats.js'
import KeySummary from './KeySummary.js'

import textGenerator from './textGenerator.js'

import {enterKey, update} from '../app/enterKey.js'
import {enterStat, statUpdater} from '../app/statUpdater.js'
import setPrompt from '../app/setPrompt.js'
const lessons = {
    basics:{cap:false,num:false,word:20,paran:{
        '< >':false,
        '{ }':false,
        '[ ]':false,
        '" "':false,
        "' '":false,
        '( )':false,
        'all':false
    },spChar:''},
    caps: {cap:true,num:false,word:20,paran:{
        '< >':false,
        '{ }':false,
        '[ ]':false,
        '" "':false,
        "' '":false,
        '( )':false,
        'all':false
    },spChar:''},
    numbers:{cap:false,num:true,word:20,paran:{
        '< >':false,
        '{ }':false,
        '[ ]':false,
        '" "':false,
        "' '":false,
        '( )':false,
        'all':false
    },spChar:''},
    brackets:{cap:false,num:false,word:20,paran:{
        '< >':true,
        '{ }':true,
        '[ ]':true,
        '" "':true,
        "' '":true,
        '( )':true,
        'all':true
    },spChar:''},
    characters:{cap:false,num:false,word:20,paran:{
        '< >':false,
        '{ }':false,
        '[ ]':false,
        '" "':false,
        "' '":false,
        '( )':false,
        'all':false
    },spChar:'~`!@%^&*-_|\\#$_+=/?;:,.'},
    master:{cap:true,num:true,word:20,paran:{
        '< >':true,
        '{ }':true,
        '[ ]':true,
        '" "':true,
        "' '":true,
        '( )':true,
        'all':true
    },spChar:'~`!@%^&*-_|\\#$_+=/?;:,.'}
    
}
    
class App extends React.Component {
  constructor(props){
      super(props)
      this.state = {toggle:true}
      this.setToggle = this.setToggle.bind(this)
      props.enterKey(textGenerator(lessons[props.match.params.lesson]),'refresh')
      props.setPrompt('setPrompt',lessons[props.match.params.lesson])
      this.handleSelect = this.handleSelect.bind(this)
      setTimeout(()=> document.getElementById('promptBox').focus(), 0)
      
  }
  componentDidUpdate(prevProps){
      if(prevProps.match.params != this.props.match.params){
        this.props.enterKey(textGenerator(lessons[this.props.match.params.lesson]),'refresh')
        this.props.setPrompt('setPrompt',lessons[this.props.match.params.lesson])
        if(document.getElementById('promptBox')){
            setTimeout(()=> document.getElementById('promptBox').focus(), 0)
        }
      }
      
      
  }
  setToggle(){
      this.setState({toggle:!this.state.toggle})
  }
  handleSelect(k){
      if(k=='typingMode'){
        setTimeout(()=> document.getElementById('promptBox').focus(), 0)
      }
  }
  render() {
    return (
      <div id="lessonContainer" className='contentstuff'>
        <h1 id="title">Touch Typing Practice</h1>
        <Stats setToggle = {this.setToggle} tog = {this.state.toggle} data={this.props.data} enterKey={this.props.enterKey} enterStat={this.props.enterStat}/>
        <br />
        <div id='inputArea' >
            <Tabs className='tabClass' onSelect = {this.handleSelect}>
                <Tab eventKey='typingMode' title='Typing Mode' >
                    <Render enterKey={this.props.enterKey} enterStat={this.props.enterStat} data={this.props.data} />
                </Tab>
                <Tab eventKey='statMode' title='Stats Mode'>
                    <KeySummary data={this.props.data.update.error} />
                </Tab>
            </Tabs>
        </div>
      </div>
    );
  }
}



export default ReactRedux.connect(
  (state) => ({ data: state }),
  (dispatch) => ({
    enterKey: (payload,type) => dispatch(enterKey(payload,type)),
    enterStat:(type,payload) =>dispatch(enterStat(type,payload)),
    setPrompt: (type,payload) => dispatch({type:type,payload:payload})
  })
)(App);