import React from 'react'
import {Form,Row,Col} from 'react-bootstrap'


const PromptSetting = (props)=>{
    function check(e,dic){
        const {name,checked} = e.target
        let ret = {}
        if(name==='all'){
            let arr =Object.entries(dic)
            arr.map(items=>items[1] = checked)
            props.func({...props.data,paran:Object.fromEntries(arr)})
            return
        }
        ret[name] = checked
        props.func({...props.data,paran:{...dic,...ret}})
    }
    return(
            <div>
                <Form id='settingForm'>
                    <Form.Group as={Row} >
                        <Col xs='2'>
                        <Form.Label>Length</Form.Label>
                        </Col>
                        <Col xs="7">
                          <Form.Control
                            type='range'
                            value={props.data.word}
                            onChange={e => props.func({...props.data,word:e.target.value})}
                          />
                        </Col>
                        <Col xs="3">
                          <Form.Control disabled
                          value={props.data.word}
                          />
                          
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col>
                            <Form.Check type='switch' id='capswitch' label='Captial Word'
                            checked={props.data.cap}
                            onChange={e => props.func({...props.data,cap:e.target.checked})}/>
                        </Col>
                        <Col>
                            <Form.Check id='numswitch' type='switch' label='Number'
                            checked={props.data.num}
                            onChange={e => props.func({...props.data,num:e.target.checked})}/>
                        </Col>
                    </Form.Group>
                    
                    <Form.Group>

                                <Form.Label style={{'margin-right':'15px'}}>Paranthesis   </Form.Label>
                
                                <Form.Check id='paranAll' name='all' inline label='Select All' type='switch'
                                checked={props.data.paran.all}
                                onChange={e => check(e,props.data.paran)}/>
                           
                        <Row>
                        {Object.entries(props.data.paran)
                        .filter(items=> items[0]!=='all')
                        .map(items=>(
                            <Col>
                            <Form.Check inline type='checkbox' name={items[0]} id={`checkbox-${items[0]}`} label={items[0]}
                            checked={items[1]}
                            onChange={e => check(e,props.data.paran)} />
                            </Col>
                        )
                               
                        )}
                        </Row>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={3}>
                          Special Characters
                        </Form.Label>
                        <Col sm={9}>
                          <Form.Control type="text" value={props.data.spChar}
                          onChange={e => props.func({...props.data,spChar:e.target.value})}
                          />
                        </Col>
                      </Form.Group>

                    
                </Form>
            </div>
        )
        
}
export default PromptSetting

