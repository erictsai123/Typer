import React from 'react'
import * as ReactRedux from 'react-redux'

import {Modal,Button} from 'react-bootstrap'
import PromptSetting from './PromptSetting.js'
import textGenerator from '../functions/textGenerator.js'
import {enterKey} from '../reducers/enterKey.js'
function Custom(props){
    function handleClick(){
        props.setConfig('setPrompt',props.config)
        props.enterKey(textGenerator(props.config),'refresh')
        props.setClose()
        
    }
    return (
        <Modal show={props.state} onHide={props.setClose} variant='dark'>
        <Modal.Header closeButton>
          <Modal.Title style={{color:"black"}}>Practice Setup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <PromptSetting data={props.config} func={props.setConfig} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" style={{color:"white"}} onClick={props.setClose}>
            Close
          </Button>
          <Button  variant="primary" style={{color:"white"}}
          onClick={handleClick}>
            Save Setting
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default ReactRedux.connect(state=> ({config:state.setPrompt}),
  (dispatch) => ({
    setConfig: (payload) => dispatch({type:'setPrompt',payload:payload}),
    enterKey: (payload,type) => dispatch(enterKey(payload,type))
    
  })
)(Custom);
