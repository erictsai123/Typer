import React from 'react'
import { Navbar,Nav,NavDropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
class MyNavbar extends React.Component{
    render(){
        return(
            <div>
               <Navbar variant='dark' bg='none'  id='navbar'>
                <Navbar.Brand as={Link} to='/'>type.io</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className ='justify-content-end' >
                <Nav>
                    <NavDropdown  variant='dark' title="Lesson" id="collasible-nav-dropdown">
                        <NavDropdown.Item variant='dark'as={Link} to="/practice/basics">Lesson 1 - The Basics</NavDropdown.Item>
                        <NavDropdown.Item variant='dark'as={Link} to="/practice/caps">Lesson 2 - The Uppercase</NavDropdown.Item>
                        <NavDropdown.Item variant='dark'as={Link} to="/practice/numbers">Lesson 3 - The Numbers</NavDropdown.Item>
                        <NavDropdown.Item variant='dark'as={Link} to="/practice/brackets">Lesson 4 - The Brackets</NavDropdown.Item>
                        <NavDropdown.Item variant='dark'as={Link} to="/practice/characters">Lesson 5 - The Characters</NavDropdown.Item>
                        <NavDropdown.Item variant='dark'as={Link} to="/practice/master">Lesson 6 - The Master</NavDropdown.Item>
                    </NavDropdown>
                    {/*<Nav.Link as={Link} to='/feedback'>Feedback</Nav.Link>*/}
                    <Nav.Link as={Link} to='/about'>About</Nav.Link>
                    {this.props.login?
                       <NavDropdown alignRight variant='dark' title="Profile" id="collasible-nav-dropdown">
                        <NavDropdown.Item variant='dark'as={Link} to="" onClick={this.props.logout}>Logout</NavDropdown.Item>
                         </NavDropdown>
                    :
                        <Nav.Link as={Link} to='/account'>Login</Nav.Link>
                    }
                </Nav>
                </Navbar.Collapse>
               </Navbar>
            </div>
           
        )
    }
}

export default connect(state=> ({login:state.accountRedux.username}),
dispatch=>({logout:()=>dispatch({type:'logout',payload:''})})
)(MyNavbar);