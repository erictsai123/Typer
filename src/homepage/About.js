import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
export default class About extends React.Component {
  render() {
    return (
      <div className="contentstuff">
        <h1>Mission</h1>
        <p>To create a tool for everyone to practice touch typing</p>
        <hr />
        <h1>About</h1>
        <p>
          {" "}
          When I first started programming, I realized programming is hard, but
          the ability to type correctly and efficiently is equally hard.
          Improper makes coding extremely difficult, and typing errors take away
          from the flow when one’s typing ability cannot keep up with one’s
          thinking ability. Typos in the code also make debugging much more
          difficult, with errors often resulting from the smallest mistakes that
          are crucial to the interpreter, such as using a bracket instead of a
          curly bracket, or case mistakes.
        </p>
        <br />
        <p>
          I realized that typing is a basic skill that everyone should have to
          become a productive member of society in the 21st century. Thus, I
          decided to create this app to help others practice touch typing and
          find the flow for their work needs.
        </p>
        <h1>Q&A</h1>
        <Accordion>
          <Card bg="dark">
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Do I need an Account?
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body style={{ background: "black" }}>
                NO! You can start typing without an account. However, creating
                an account allows you to track your past statistics and the
                progress you have made.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card bg="dark">
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Do I need to know basic typing skills?
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body style={{ background: "black" }}>
                NO! The lessons are designed for absolute beginners. Start
                typing right away and expect your speed and accuracy to improve
                as you practice.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card bg="dark">
            <Accordion.Toggle as={Card.Header} eventKey="2">
              How fast should I expect improvement?
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body style={{ background: "black" }}>
                The great thing about typing is you will notice your skill
                improving everyday. You will notice you are more familiar with
                certain keys and as each key becomes automatic, your overall
                typing ability will improve as you are more familiar with the
                keys.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}
