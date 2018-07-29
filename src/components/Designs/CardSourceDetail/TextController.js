import React, { Component } from "react";

class TextController extends Component {
  componentDidMount() {
    if (this.props.item) this.edit.innerHTML = this.props.item.content;
    if (this.props.initClick) this.edit.focus();
  }

  onBlur = e => {
    console.log(this.props.name);
    if (this.props.name.indexOf("add") > -1 && this.edit.textContent === "") {
      console.log(">?");
      this.props.setController("INIT");
    }
  };
  render() {
    const { item } = this.props;
    return (
      <div>
        <div
          className="editorDIV"
          ref={ref => (this.edit = ref)}
          contentEditable="true"
          onBlur={this.onBlur}
        />
      </div>
    );
  }
}

export default TextController;
