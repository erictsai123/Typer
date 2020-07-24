import React from 'react'
import Form from 'react-bootstrap/Form'
import {Button,Col} from 'react-bootstrap'
export default class Feedback extends React.Component{
    render(){
        return (
            <div className='contentstuff'>
                <h1>Feedback</h1>
                <p>Thank you for your feedback. We will improve it ASAP to provide a better experience</p>
                <Form>
                    <Form.Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>First Name </Form.Label>
                                <Form.Control type='text' ></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Last Name </Form.Label>
                                <Form.Control type='text' ></Form.Control>
                            </Form.Group>
                        </Col>
                         <Col>
                            <Form.Group>
                                <Form.Label>User Name @</Form.Label>
                                <Form.Control type='text' ></Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' ></Form.Control>
                            </Form.Group>
                            
                    
                    
                    <Form.Group>
                    <Form.Label style={{display:'block'}}>Which Area Can We Improve</Form.Label>
                        <Form.Row>
                            <Col> <Form.Check  label='Text Selection' type='checkbox' /></Col>
                            <Col> <Form.Check  label='Presentation' type='checkbox' /></Col>
                            <Col> <Form.Check  label='Statistics' type='checkbox' /></Col>
                            
                        </Form.Row>
                   
                
                    </Form.Group>
                    
                    
                    <Form.Group>
                    <Form.Label style={{display:'block'}}>How Would You Rate This App</Form.Label>
                        <Form.Row>
                            <Col> <Form.Check name='radio' label='1' type='radio' /></Col>
                            <Col> <Form.Check name='radio' label='2' type='radio' /></Col>
                            <Col> <Form.Check name='radio' label='3' type='radio' /></Col>
                            <Col> <Form.Check name='radio' label='4' type='radio' /></Col>
                            <Col> <Form.Check name='radio' label='5' type='radio' /></Col>
                        </Form.Row>
                   
                
                    </Form.Group>
                    
                    <Form.Group>
                    <Form.Label style={{display:'block'}}>Please Provide Feedback</Form.Label>
                    <Form.Control as='textarea' rows='10' />
                    </Form.Group>
                    
                    <Form.Group>
                    <Button type='submit' variant='outline-dark' className='btn' >Submit</Button>
                    </Form.Group>
                </Form>
            </div>
            
            )
    }
}