import React from "react";
import * as ReactRedux from "react-redux";
import { Tab, Tabs, Container } from "react-bootstrap";
import Render from "../app/Render.js";
import Stats from "../app/Stats.js";
import KeySummary from "../app/KeySummary.js";
import textGenerator from "../functions/textGenerator.js";
import { enterKey } from "../reducers/enterKey.js";
import { enterStat } from "../reducers/statUpdater.js";
import axios from "axios";
const lessons = {
  basics: {
    cap: false,
    num: false,
    word: 20,
    paran: {
      "< >": false,
      "{ }": false,
      "[ ]": false,
      '" "': false,
      "' '": false,
      "( )": false,
      all: false,
    },
    spChar: "",
  },
  caps: {
    cap: true,
    num: false,
    word: 20,
    paran: {
      "< >": false,
      "{ }": false,
      "[ ]": false,
      '" "': false,
      "' '": false,
      "( )": false,
      all: false,
    },
    spChar: "",
  },
  numbers: {
    cap: false,
    num: true,
    word: 20,
    paran: {
      "< >": false,
      "{ }": false,
      "[ ]": false,
      '" "': false,
      "' '": false,
      "( )": false,
      all: false,
    },
    spChar: "",
  },
  brackets: {
    cap: false,
    num: false,
    word: 20,
    paran: {
      "< >": true,
      "{ }": true,
      "[ ]": true,
      '" "': true,
      "' '": true,
      "( )": true,
      all: true,
    },
    spChar: "",
  },
  characters: {
    cap: false,
    num: false,
    word: 20,
    paran: {
      "< >": false,
      "{ }": false,
      "[ ]": false,
      '" "': false,
      "' '": false,
      "( )": false,
      all: false,
    },
    spChar: "~`!@%^&*-_|\\#$_+=/?;:,.",
  },
  master: {
    cap: true,
    num: true,
    word: 20,
    paran: {
      "< >": true,
      "{ }": true,
      "[ ]": true,
      '" "': true,
      "' '": true,
      "( )": true,
      all: true,
    },
    spChar: "~`!@%^&*-_|\\#$_+=/?;:,.",
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toggle: true };
    this.setToggle = this.setToggle.bind(this);
    props.enterKey(
      textGenerator(lessons[props.match.params.lesson]),
      "refresh"
    );
    props.setPrompt("setPrompt", lessons[props.match.params.lesson]);
    this.handleSelect = this.handleSelect.bind(this);
    if (localStorage.getItem("username")) {
      axios
        .get("/stats/" + localStorage.getItem("username"))
        .then((response) => {
          props.updateStat(response.data);
        });
    }
  }
  componentDidMount() {
    setTimeout(() => document.getElementById("promptBox").focus(), 0);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.props.enterKey(
        textGenerator(lessons[this.props.match.params.lesson]),
        "refresh"
      );
      this.props.setPrompt(
        "setPrompt",
        lessons[this.props.match.params.lesson]
      );
      if (document.getElementById("promptBox")) {
        setTimeout(() => document.getElementById("promptBox").focus(), 0);
      }
    }
  }
  setToggle() {
    this.setState({ toggle: !this.state.toggle });
  }
  handleSelect(k) {
    if (k === "typingMode") {
      setTimeout(() => document.getElementById("promptBox").focus(), 0);
    }
  }
  render() {
    return (
      <Container id="lessonContainer" className="contentstuff">
        <h1 style={{ "line-height": ".5" }} id="title">
          Touch Typing Practice
        </h1>
        <Stats
          setToggle={this.setToggle}
          tog={this.state.toggle}
          data={this.props.data}
          enterKey={this.props.enterKey}
          enterStat={this.props.enterStat}
        />
        <br />
        <div id="inputArea">
          <Tabs className="tabClass" onSelect={this.handleSelect}>
            <Tab eventKey="typingMode" title="Typing Mode">
              <Render
                enterKey={this.props.enterKey}
                enterStat={this.props.enterStat}
                data={this.props.data}
              />
            </Tab>
            <Tab eventKey="statMode" title="Stats Mode">
              <KeySummary
                user={this.props.data.accountRedux}
                error={this.props.data.update.error}
              />
            </Tab>
          </Tabs>
        </div>
      </Container>
    );
  }
}

export default ReactRedux.connect(
  (state) => ({ data: state }),
  (dispatch) => ({
    enterKey: (payload, type) => dispatch(enterKey(payload, type)),
    enterStat: (type, payload) => dispatch(enterStat(type, payload)),
    setPrompt: (type, payload) => dispatch({ type: type, payload: payload }),
    updateStat: (payload) =>
      dispatch({ type: "statsSummary", payload: payload }),
  })
)(App);
