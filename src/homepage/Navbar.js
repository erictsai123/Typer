import React,{setState} from 'react'
import { Navbar,Nav,NavDropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'
export default class MyNavbar extends React.Component{
    constructor(props){
        super(props)
        
    }
    
    render(){
        return(
            <div>
               <Navbar variant='dark' bg='none'  id='navbar'>
                <Navbar.Brand as={Link} to='/'>type.io</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className ='justify-content-end' >
                <Nav>
                    <NavDropdown variant='dark' title="Lesson" id="collasible-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/practice/basics">Lesson 1 - The Basics</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/practice/caps">Lesson 2 - The Uppercase</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/practice/numbers">Lesson 3 - The Numbers</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/practice/brackets">Lesson 4 - The Brackets</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/practice/characters">Lesson 5 - The Characters</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/practice/master">Lesson 6 - The Master</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link as={Link} to='/feedback'>Feedback</Nav.Link>
                    <Nav.Link as={Link} to='/about'>About</Nav.Link>
                    
                </Nav>
                </Navbar.Collapse>
               </Navbar>
            </div>
           
        )
    }
}

