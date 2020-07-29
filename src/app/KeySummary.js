import React from "react";
import { Row, Col, Container, Jumbotron, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {XYPlot,VerticalBarSeries, XAxis,YAxis,HorizontalGridLines,} from "react-vis";
import processData from "../functions/processData.js";
import errorSummery from "../functions/errorSummery.js";
export default class KeySummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 250 };
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    this.setState({
      width: document.getElementById("lessonContainer").clientWidth - 20,
    });
    window.addEventListener("resize", this.handleResize);
  }
  handleResize() {
    if (document.getElementById("lessonContainer")) {
      this.setState({
        width: document.getElementById("lessonContainer").clientWidth - 20,
      });
    }
  }
  render() {
    if (this.props.user.stats.length === 0) {
      return (
        <Jumbotron style={{ background: "transparent" }}>
          <h1>No Statistics Available</h1>
          {this.props.user.username ? (
            <p>Start typing to track your progress</p>
          ) : (
            <div>
              <p>Make sure to sign in to view your Progress</p>
              <Button
                as={Link}
                to="/account"
                variant="outline-dark"
                className="btn"
              >
                Sign In{" "}
              </Button>
            </div>
          )}
        </Jumbotron>
      );
    }
    const axisStyle = {
      ticks: {
        fontSize: "14px",
        fill: "white",
      },
      title: {
        fontSize: "16px",
        fill: "white",
      },
    };
    let stats = processData(this.props.user.stats);
    let dat = errorSummery(stats.err);
    let graph = stats.err ? (
      <Row>
        <XYPlot
          xType="ordinal"
          width={this.state.width}
          height={this.state.height}
          yDomain={[0, dat[0].y]}
          margin={{ left: 40, top: 10 }}
        >
          <HorizontalGridLines />
          <VerticalBarSeries data={dat.slice(0, 10)} />
          <XAxis style={axisStyle} />
          <YAxis style={axisStyle} />
        </XYPlot>
      </Row>
    ) : (
      <p>No Typos so far!</p>
    );
    return (
      <Container id="KeySummary" ref="child">
        <Row>
          <Col sm={3}>
            <p>Total Minutes</p>
            <h5 data-testid='time'>{stats.ttlTime}</h5>
          </Col>
          <Col sm={3}>
            <p>Total Words</p>
            <h5 data-testid='word'>{stats.ttlWord}</h5>
          </Col>
          <Col sm={3}>
            <p> Avg. WPM</p>
            <h5 data-testid='wpm'>{stats.med_wpm}</h5>
          </Col>
          <Col sm={3}>
            <p> Avg. Efficiency</p>
            <h5 data-testid='eff'>{stats.med_eff}%</h5>
          </Col>
        </Row>
        <h3 style={{ "textAlign": "left" }}>Frequent Typos:</h3>
        {graph}
      </Container>
    );
  }
}
