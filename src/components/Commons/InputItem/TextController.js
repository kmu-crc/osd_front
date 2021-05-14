import React, { useRef, useEffect } from 'react'
import SunEditor, { buttonList } from 'suneditor-react'
import styled, { css } from "styled-components"
import market_style from "market_style"
import 'suneditor/dist/css/suneditor.min.css'

const defaultHeight = 100

const EditorWrapper = styled.div`
  width: 100%;
  height: ${defaultHeight}px;
  position: relative;
  margin-bottom: ${props => props.marginBottom ? props.marginBottom : 5}px;
  .copyright {
    position: absolute;
    width: max-content;
    right: 7px;
    top: 5px;
    margin-left: auto;
    font-size: ${market_style.font.size.tiny1};
    color: #707070;
    z-index: 600;
  }
  .editor {
    width: 100%;
    max-width: ${props => props.width == null ? "100%" : props.width + "px"};
    height: 100%;
    min-height: 300px;
    font-size: ${market_style.font.size.tiny1};
    border: none;
    z-index: 500;
  }
`
const EditorDefaultStyle = css`
  font-family: Noto Sans KR; //cursive; 
  font-size: 1.25rem;
`

export const TextController = props => {
  const editorRef = useRef()
  useEffect(() => {
    // const editor = editorRef.current.editor
  }, [])
  return (
    <EditorWrapper>
      <div className="copyright">powerby SunEditor</div>
      <SunEditor
        lang="ko"
        name={(props.item && props.item.id) ? "sun-editor-" + props.item.id : "sun-editor"}
        // defaultValue="<p>내용을 입력해주세요</p>"
        // width="100%"
        height={props.height || defaultHeight}
        placeholder="내용을 입력해주세요 :)"
        autoFocus={true}
        setOptions={{ // height: props.height || defaultHeight,
          buttonList: [
            ['undo', 'redo', 'font', 'fontSize', 'formatBlock', 'lineHeight'],
            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
            '/',
            ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list'],
            ['fullScreen']
            // ['link', 'image', 'video', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'table']
          ]
        }}
        toggleFullScreen={(isFullScreen) => {
          props.fullScreen && props.fullScreen(isFullScreen)
          // editorRef.current.editor.show = false;
        }}
        setContents={(props.item && props.item.content) || ""}
        setDefaultStyle={EditorDefaultStyle}
        onChange={(data) => props.getValue(data)}
        ref={editorRef}
      />
    </EditorWrapper>
  )
}