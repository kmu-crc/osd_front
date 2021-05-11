import React, { Component } from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";

import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Heading from '@ckeditor/ckeditor5-heading/src/heading';

import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Font from '@ckeditor/ckeditor5-font/src/font'
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'

import styled from "styled-components";
import market_style from "market_style";

const EditorWrapper = styled.div`
    width:100%;
    height:300px;
    position: relative;
    margin-bottom: ${props => props.marginBottom ? props.marginBottom : 5}px;
    .copyright {
        position: absolute;
        width: max-content;
        right: 3px;
        top: 0px;
        margin-left: auto;
        font-size: ${market_style.font.size.tiny1};
        color: #707070;
    }
    .editor {
        width:100%;
        max-width:${props => props.width == null ? "100%" : props.width + "px"};
        // height:${props => props.editheight == null ? "100%" : props.editheight + "px"};
        height:100%;
        min-height:300px;
        font-size: ${market_style.font.size.tiny1};
        border:none;
    }
    .ck-editor__editable {
      min-height: 250px;
    }
`;

const editorConfiguration = {
  plugins: [
    Essentials, Paragraph, Bold, Italic, Heading,
    Font, BlockQuote, Table, TableToolbar, Alignment,
  ],
  toolbar: [
    "heading", "|", 'undo', 'redo', "|",
    "alignment", "bold", "italic", "underline", "strikethrough", 'fontColor', 'fontBackgroundColor', 'fontSize', 'fontFamily',
    "|", 'blockQuote', 'insertTable',
  ],
  heading: {
    options: [
      { model: "paragraph", view: "p", title: "본문", class: "ck-heading_paragraph", },
      { model: "heading1", view: "h1", title: "헤더1", class: "ck-heading_heading1", },
      { model: "heading2", view: "h2", title: "헤더2", class: "ck-heading_heading2", },
      { model: "heading3", view: "h3", title: "헤더3", class: "ck-heading_heading3", },
    ],
  },
  fontSize: {
    options: [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 26],
  },
  alignment: {
    options: ["justify", "left", "center", "right"],
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
  image: {
    resizeUnit: "px",
    toolbar: [
      "imageStyle:alignLeft", "imageStyle:full", "imageStyle:alignRight", "|", "imageTextAlternative",
    ],
    styles: ["full", "alignLeft", "alignRight"],
  },
  typing: {
    transformations: {
      remove: [
        "enDash", "emDash", "oneHalf", "oneThird", "twoThirds", "oneForth", "threeQuarters",
      ],
    },
  },
  placeholder: "내용을 입력하세요.",
};


export class TextControllerPlus extends Component{
  render(){
    const { item } = this.props;
    // console.log("Array:", Array.from(editor.ui.componentFactory.names()));
    return (
      <EditorWrapper border={this.props.border} width={this.props.width} editheight={this.props.editheight} height={item.height} marginBottom={this.props.marginBottom}>
      <CKEditor
          className="editor"
          width={"100%"}
          height={"100%"}
          editor={ClassicEditor}
          data={this.props.item.content}
          config={editorConfiguration}
          onBlur={async (_, editor) => {
            let data = editor.getData();
            await this.props.getValue({ content: data });
          }}
        />
      </EditorWrapper>
    );
  }
}