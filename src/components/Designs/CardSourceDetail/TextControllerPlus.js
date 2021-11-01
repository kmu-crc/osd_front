import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Link from 'components/Commons/ckeditor5-link/src/link';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Font from '@ckeditor/ckeditor5-font/src/font';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import styled from 'styled-components';
// import noimg from "source/noimg.png"

const Wrapper = styled.div`
.ck-editor__editable { 
  height:max-content;
  min-height:${props=>props.userHeight == null ?"max-content":props.userHeight+"px"}; 
}
`

// import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
ClassicEditor.builtinPlugins = [Essentials, Autoformat, Alignment, Font, Bold, Italic, BlockQuote, Heading, Link, Paragraph, Table, TableToolbar,Indent,IndentBlock]
ClassicEditor.defaultConfig = {
  startupFocus: true,
  alignment: { options: ['left', 'center', 'justify', 'right'] },
  toolbar: { items: ['heading', '|', 'fontSize', /*'fontFamily',*/ 'fontColor', 'fontBackgroundColor', 'bold', 'italic', 'alignment','|','outdent','indent','|', 'link', 'blockQuote', 'insertTable', 'undo', 'redo'] },
  table: { contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'] },
  indentBlock: {
    offset: 5,
    unit: 'em'
  },
  fontSize: { options: [14, 16, 18, 22, 24, 30, 36, 48] },
  language: 'en',
};

class TextControllerPlus extends Component {
  state = {};
  componentDidMount() {
    if (this.props.item) {
      this.setState(this.props.item);
    }
  }
  onSave = async () => {
    let data = this.edit.editor && this.edit.editor.getData()
    await this.setState({ content: data,initClick:false });
    this.props.onBlurOrder&&this.props.onBlurOrder();
    this.props.getValue(this.state)
  }
  render() {
    const { item, id, donotfocus } = this.props;
    console.log(this.props);
    return (
      <Wrapper height={window.document.getElementsByClassName("ck-editor__editable").height} userHeight={this.props.userHeight}>
      <CKEditor
        id={id}
        ref={ref => (this.edit = ref)}
        data={item.content}
        onBlur={this.onSave}
        onInit={editor => { donotfocus === false && editor.editing.view.focus(); }}
        editor={ClassicEditor} />
      </Wrapper>
    );
  }
}

export default TextControllerPlus;
