import React from "react";
import "./AutoCompleteText.css";

export default class AutoCompleteText extends React.Component {
  state = {
    suggesions: [],
    text: "",
    SelectedIndex: 0,
  };

  handleKeyDown = (e) => {
    const { SelectedIndex, suggesions } = this.state;

    if (e.keyCode === 40 && SelectedIndex !== suggesions.length - 1) {
      // down key
      this.setState({ SelectedIndex: SelectedIndex + 1 });
    } else if (e.keyCode === 38 && SelectedIndex !== 0) {
      // up key
      this.setState({ SelectedIndex: SelectedIndex - 1 });
    } else if (e.keyCode === 27) {
      // escape key
      this.setState(() => ({ suggesions: [], text: "", SelectedIndex: 0 }));
    } else if (e.keyCode === 13) {
      // enter key
      if (e.target.value !== "") {
        this.suggestionSelected(suggesions[SelectedIndex]);
      }
    }
  };

  onTextChanged = (e) => {
    const { items } = this.props;
    const value = e.target.value;
    let suggesions = [];
    if (value.length > 0) {
      const regex = new RegExp(`${value}`, "i");
      suggesions = items.sort().filter((c) => regex.test(c.title));
    }
    this.setState(() => ({ suggesions, text: value, SelectedIndex: 0 }));
  };

  suggestionSelected(value) {
    this.props.setCourse(value);
    this.setState(() => ({
      text: "",
      suggesions: [],
    }));
  }

  renderSuggestion() {
    const { suggesions, SelectedIndex } = this.state;

    if (suggesions.length === 0) {
      return null;
    }

    return (
      <ul>
        {suggesions.map((item, i) => (
          <li
            key={i}
            onClick={() => this.suggestionSelected(item)}
            className={i === SelectedIndex ? "selected" : ""}
          >
            {item.title}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { text } = this.state;
    const { handleKeyDown } = this;
    return (
      <div className="AutoCompleteText">
        <input
          value={text}
          onChange={this.onTextChanged}
          onKeyDown={handleKeyDown}
          type="text"
          style={{ width: "350px" }}
        />
        {this.renderSuggestion()}
      </div>
    );
  }
}
