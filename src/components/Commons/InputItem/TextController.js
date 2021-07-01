// import React, { useRef, useEffect } from 'react'
// import SunEditor, { buttonList } from 'suneditor-react'
// import { css } from "styled-components"
// import 'suneditor/dist/css/suneditor.min.css'

import React from 'react';

export const TextController = props => {
  return(<div>text editor</div>)
}

// const EditorDefaultStyle = css`
//   font-family: Noto Sans KR; //cursive; 
//   font-size: 1.25rem;
// `
// export const TextController = props => {
//   const editorRef = useRef()
//   const defaultHeight = 100
//   return (
//     <SunEditor
//       lang="ko"
//       name={(props.item && props.item.id) ? "sun-editor-" + props.item.id : "sun-editor"}
//       // defaultValue="<p>내용을 입력해주세요</p>"
//       // width="100%"
//       height={props.height || defaultHeight}
//       placeholder="내용을 입력해주세요 :)"
//       autoFocus={true}
//       setOptions={{ // height: props.height || defaultHeight,
//         buttonList: [
//           ['fullScreen'],
//           ['undo', 'redo', 'font', 'fontSize', 'formatBlock', 'lineHeight'],
//           ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
//           '/',
//           ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list'],
//           // ['link', 'image', 'video', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'table']
//         ]
//       }}
//       toggleFullScreen={(isFullScreen) => {
//         props.fullScreen && props.fullScreen(isFullScreen)
//         // editorRef.current.editor.show = false;
//       }}
//       setContents={(props.item && props.item.content) || ""}
//       setDefaultStyle={EditorDefaultStyle}
//       onChange={(data) => props.getValue({ content: data })}
//       ref={editorRef}
//     />
//   )
// }