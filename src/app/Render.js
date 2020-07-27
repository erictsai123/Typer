import React from "react";
import axios from "axios";
import textGenerator from "../functions/textGenerator.js";
import { connect } from "react-redux";
class Render extends React.Component {
  constructor(props) {
    super(props);
    this.hitKey = this.hitKey.bind(this);
  }
  hitKey(event) {
    const ind = this.props.data.update.index;
    if (event.keyCode > 15 && event.keyCode < 20) {
      return;
    }
    if (event.keyCode === 13) {
      if (ind === this.props.data.update.prompt.length) {
        let payload = {
          username: this.props.data.accountRedux.username,
          duration:
            (this.props.data.statUpdater.timeEnd -
              this.props.data.statUpdater.timeStart) /
            1000,
          corrKey: this.props.data.statUpdater.correctKey,
          keyCounter: this.props.data.statUpdater.keyCounter,
          length: this.props.data.update.prompt.length,
          incorrectKeys: this.props.data.update.error,
          wpm: document.getElementById("wpm").innerHTML,
          eff: document.getElementById("eff").innerHTML,
        };
        axios.post("/score", payload);
        this.props.updateStat(payload);
      }
      this.props.enterKey(textGenerator(this.props.data.setPrompt), "refresh");
      return;
    }
    if (ind === 0) {
      this.props.enterStat("start");
    }

    if (event.keyCode === 8) {
      if (ind === 0) {
        this.props.enterKey(0, "reset");
        return;
      }
      this.props.enterStat("backtrackstat", [
        ind,
        this.props.data.update.arr[
          this.props.data.update.arr.length - 1
        ].correction.substr(-1),
        this.props.data.update.prompt[ind - 1],
      ]);

      this.props.enterKey(event.key, "backtrack");
    } else {
      if (ind < this.props.data.update.prompt.length) {
        this.props.enterKey(event.key, "enter key");
        if (ind === this.props.data.update.prompt.length - 1) {
          this.props.enterStat("end");
        }
      } else {
        return;
      }
    }

    if (
      event.keyCode === 32 &&
      this.props.data.update.prompt[ind] === String.fromCharCode(0x2423)
    ) {
      this.props.enterStat("space", 1);
      this.props.enterStat(
        "key",
        this.props.data.update.prompt[ind] === String.fromCharCode(0x2423)
      );
      return;
    }
    this.props.enterStat(
      "key",
      this.props.data.update.prompt[ind] === event.key
    );
  }

  render() {
    return (
      <div
        className="textIO"
        id="promptBox"
        data-testid="promptbox"
        tabIndex="0"
        onKeyDown={this.hitKey}
      >
        <p>
          {this.props.data.update.arr.map((element, i) =>
            element.correctness ? (
              <span
                data-testid={
                  i + "-" + element.value.length + element.correctness
                }
                style={{ color: "#55a356", fontWeights: "bold" }}
              >
                {element.value}
              </span>
            ) : (
              <span
                data-testid={
                  i + "-" + element.value.length + element.correctness
                }
                style={{ background: "#a35555" }}
              >
                {element.correction}
              </span>
            )
          )}
          <span id="pointer">
            {this.props.data.update.prompt[this.props.data.update.index]}
          </span>
          <span>
            {this.props.data.update.prompt.slice(
              this.props.data.update.index + 1
            )}
          </span>
          <span>{String.fromCharCode(0x21b5)}</span>
        </p>
      </div>
    );
  }
}

export default connect(null, (dispatch) => ({
  updateStat: (payload) => dispatch({ type: "statsSummary", payload: payload }),
}))(Render);
