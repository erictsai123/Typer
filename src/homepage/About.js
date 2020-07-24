import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
export default class About extends React.Component{
    render(){
        return(
            <div className='contentstuff'>
                <h1>Mission</h1>
                <p>To create a tool for everyone to practice their touch typing</p>
                <hr/>
                <h1>About</h1>
                <p> When I first started programming, I realized the hardest part is not the technical parts, but rather the ability to type. Improper makes coding extermely difficult, and it takes away all the flow when your typing ability cannot keep up with your thinking ability. Typos in the code also makes debugging much more difficult, when the errors are often resulting in the smallest mistakes that are crucial to the interpreter, such as using a bracket instead of a curly bracket, or case mistakes.
                </p><br/>
                <p>
                    I realizdd that typing is the basic skill that everyone should have to become a productive member of the society in the 21st century. Thus, I decided to create this app to help others practicing touch typing and find their flow in their work.
                </p>
                <h1>Q&A</h1>
                <Accordion>
                    <Card bg='dark'>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            Do I need an Account?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0" >
                        <Card.Body style={{background:'black'}}>
                            NO! You can start typing without an account. However, creating an account allows you to track your past statistics and track the progress you have made.
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card bg='dark'>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            Do I need to know the basic typing skills?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1" >
                        <Card.Body style={{background:'black'}}>
                            NO! The lessons are designed for absolute beginners. Start typing right away and expect your speed and accuracy to improve as you practice
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card bg='dark'>
                        <Accordion.Toggle as={Card.Header} eventKey="2">
                            How fast should I expect improvement
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2" >
                        <Card.Body style={{background:'black'}}>
                            The great thing about typing is you will notice your skill improving everyday. You will notice you are more familiar with certain keys and as each keys become automatic, your overall typing ability will enhence as you are more familiar with the keys.
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
            
            )
    }
}