import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
function Account(props) {
  const [acct, setAcct] = useState({ name: "", pw: "" });
  const [validated, setValidated] = useState(false);
  let click = ''
  const [err, setErr] = useState("");
  const [redirect, setRedirect] = useState(false);
  
  const handleClick =  (event) => {
    click= event.target.id
  };
  const handleChange = (e) =>{
    setAcct({ ...acct, [e.target.name]: e.target.value })
  }
    
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    if (click === "login") {
      try{
        let res = await axios.post('/login',acct)
        if(res.data){
          let dat = await axios.get('/stats/'+acct)
          props.updateStat(dat.data)
          localStorage.setItem('username',res.data.name)
          props.setLogin('login',res.data.name)
          setRedirect(true)
        } else{
          setErr("Incorrect username or password");
        }
        
      }
      catch (err) {
        console.log(err)
      }
    }
       else {
      axios.post("/reg", acct).then((res) => {
        if (res.data === "username exist") {
          setErr("Username already exist");
        } else {
          localStorage.setItem("username", res.data.name);
          props.setLogin("login", res.data.name);
          setRedirect(true);
        }
      })
      .catch(console.log(err))
      
    }
  };

  if (redirect) {
    return <Redirect to="/practice/basics" />;
  }
  return (
    <div style={{ width: "40%" }}>
      <h1 style={{ "textAlign": "center" }}>Account</h1>
      <hr style={{ background: "white" }}></hr>

      <Form
        style={{ color: "white" }}
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            required
            name="name"
            data-testid='name'
            onChange={handleChange}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please enter your username
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            name="pw"
            data-testid='pw'
            onChange={handleChange}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please enter your password
          </Form.Control.Feedback>
        </Form.Group>
        <p style={{ color: "red" }}>{err}</p>
        <Button
          type="submit"
          variant="outline-dark"
          className="btn"
          id="login"
          onClick={handleClick}
        >
          Login
        </Button>
        <Button
          type="submit"
          variant="outline-dark"
          className="btn"
          style={{ "marginLeft": "5px" }}
          id="reg"
          onClick={handleClick}
        >
          Register
        </Button>
      </Form>
    </div>
  );
}

export default connect(
  (state) => ({ login: state.accountRedux }),
  (dispatch) => ({
    setLogin: (type, payload) => dispatch({ type: type, payload: payload }),
    updateStat: (payload) =>
      dispatch({ type: "statsSummary", payload: payload }),
  })
)(Account);
