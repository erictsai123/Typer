import React,{useState} from 'react'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
function Profile(props){
    const [redirect, setRedirect] = useState(false)
    function handleClick(){
         setRedirect(true)
         props.logout()
    }
    
    if(redirect){
        return <Redirect to='/'/>
    }
    
    return(
        <div>
        <Button onClick={handleClick} className='btn'>Logout</Button>
        </div>
    )
}
export default connect(state=>({info:state.accountRedux}),dispatch=>({logout:()=>dispatch({type:'logout',payload:''})}))(Profile)
