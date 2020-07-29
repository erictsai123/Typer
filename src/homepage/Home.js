import React from "react";
import { Container } from "react-bootstrap";
import MyNavbar from "./Navbar.js";
import Introduction from "./Introduction.js";
import Feedback from "./Feedback.js";
import About from "./About.js";
import {AppConnect} from "./App.js";
import Account from "./Account.js";
import Profile from "./Profile.js";
import { Switch, Route } from "react-router-dom";

import * as Redux from "redux";
import { Provider, connect } from "react-redux";
import { update } from "../reducers/enterKey.js";
import { statUpdater } from "../reducers/statUpdater.js";
import accountRedux from "../reducers/accountRedux.js";
import setPrompt from "../reducers/setPrompt.js";

const combineReducer = Redux.combineReducers({
  update,
  statUpdater,
  setPrompt,
  accountRedux,
});
const store = Redux.createStore(combineReducer);

function Home(props) {
  props.login();
  return (
    <div id="appcontainer">
      <MyNavbar />
      <Switch>
        <React.Fragment>
          <Container id="content">
            <Route path="/" component={Introduction} exact />
            <Route path="/about" component={About} />
            <Route path="/feedback" component={Feedback} />
            <Route path="/practice/:lesson?" component={AppConnect} />
            <Route path="/account" component={Account} />
            <Route path="/profile" component={Profile} />
          </Container>
        </React.Fragment>
      </Switch>
    </div>
  );
}

const Connector = connect(null, (dispatch) => ({
  login: () =>
    dispatch({
      type: "login",
      payload: localStorage.getItem("username") || "",
    }),
}))(Home);

export default () => (
  <Provider store={store}>
    <Connector />
  </Provider>
);
