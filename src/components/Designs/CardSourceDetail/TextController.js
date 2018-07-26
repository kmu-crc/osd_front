import React, { Component } from 'react';

class TextController extends Component {
  render(){
    return(
      <div>
        <input type="button" value="BOLD" onClick="document.execCommand('Underline')" />
        <div className="editorDIV" contentEditable="true"></div>
      </div>
    );
  }
}

export default TextController;
