import React from 'react'
import {Jumbotron,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
export default class Introduction extends React.Component{
    render(){
        
        return(
            <Jumbotron style={{background:'transparent'}}>
            <h1  >Touch Typing</h1>
            <p >Want to get better at typing so you dont suck like me? Start practicing today!</p>
            <Button  as={Link} to= '/practice/basics' variant='outline-dark' className='btn'>Start Typing </Button>
            </Jumbotron>
            
            )
    }
}