import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Heading from '@ckeditor/ckeditor5-heading/src/heading';

// import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
// import Link from '@ckeditor/ckeditor5-link/src/link';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Font from '@ckeditor/ckeditor5-font/src/font'
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'
// import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
// ClassicEditor.builtinPlugins = [Essentials, Autoformat, Alignment, Font, Bold, Italic, BlockQuote, Heading, Link, Paragraph, Table, TableToolbar]
// ClassicEditor.defaultConfig = {
//   alignment: { options: ['left', 'center', 'justify', 'right'] },
//   toolbar: { items: ['heading', '|', ] },
//   table: { contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'] },
//   fontSize: { options:  },
//   language: 'en'
// };
const editorConfiguration = {
  plugins: [
    Essentials, Paragraph, Bold, Italic, Heading, Font, BlockQuote, Table, TableToolbar, Alignment,
  ],
  toolbar: [
    "heading", "|", 'undo', 'redo', "|", "alignment", "bold", "italic", "underline", "strikethrough", 'fontColor', 'fontBackgroundColor', 'fontSize', 'fontFamily', "|", 'blockQuote', 'insertTable',
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


export const TextControllerPlus = (props) => {
  // console.log("Array:", Array.from(editor.ui.componentFactory.names()));
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={props.item.content}
        config={editorConfiguration}
        onBlur={async (_, editor) => {
          let data = editor.getData();
          console.log("Array:", editor.ui.componentFactory.names());
          await props.getValue({ content: data });
        }}
      //onChange={(event, editor) => { const data = editor.getData(); console.log(data); }}
      />
    </div>
  );
};