import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ContentEditable extends Component {
  constructor(props) {
    super(props);
    this.emitChange = this.emitChange.bind(this);
    this.emitBlur = this.emitBlur.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
  };
  emitChange() {
    var html = this.props.getText
      ? ReactDOM.findDOMNode(this).innerText
      : ReactDOM.findDOMNode(this).innerHTML;

    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          value: html
        }
      });
    }
    this.lastHtml = html;
  };
  emitBlur() {
    this.props.onBlur();
  }

  render() {
    return (<div
      onInput={this.emitChange}
      onBlur={this.emitBlur}
      contentEditable
      dangerouslySetInnerHTML={{ __html: this.props.html }}>
    </div>);
  }
};

export default ContentEditable;