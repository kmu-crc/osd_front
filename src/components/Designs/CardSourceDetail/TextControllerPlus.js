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
// import noimg from "source/noimg.png"

// import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
ClassicEditor.builtinPlugins = [Essentials, Autoformat, Alignment, Font, Bold, Italic, BlockQuote, Heading, Link, Paragraph, Table, TableToolbar]
ClassicEditor.defaultConfig = {
  startupFocus: true,
  alignment: { options: ['left', 'center', 'justify', 'right'] },
  toolbar: { items: ['heading', '|', 'fontSize', /*'fontFamily',*/ 'fontColor', 'fontBackgroundColor', 'bold', 'italic', 'alignment', 'link', 'blockQuote', 'insertTable', 'undo', 'redo'] },
  table: { contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'] },
  fontSize: { options: [14, 18, 24, 30, 36, 48] },
  language: 'en'
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
    await this.setState({ content: data })
    this.props.getValue(this.state)
  }
  render() {
    const { item, id, donotfocus } = this.props;
    return (
      <CKEditor
        id={id}
        ref={ref => (this.edit = ref)}
        data={item.content}
        onBlur={this.onSave}
        onInit={editor => { donotfocus === false && editor.editing.view.focus(); }}
        editor={ClassicEditor} />
    );
  }
}

export default TextControllerPlus;
