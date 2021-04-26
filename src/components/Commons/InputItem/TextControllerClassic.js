import React, { Component } from 'react';
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from "styled-components";
import Editor from "react-quill";
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import market_style from "market_style";

const EditorWrapper = styled.div`
    width:100%;
    height:100%;
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
        height:100%;
        height:${props => props.editheight == null ? "100%" : props.editheight + "px"};
        font-size: ${market_style.font.size.tiny1};
        // border: ${props => props.border == null ? "1px solid #EFEFEF" : props.border};
        border:none;
        .ql-snow {
            max-height: ${props => props.editheight == null ? "100%" : props.editheight - 44 + "px"};
        }
        .ql-editor {
            max-height: ${props => props.editheight == null ? "100%" : props.editheight - 44 + "px"};
        }
        .ql-blank {
            max-height: ${props => props.editheight == null ? "100%" : props.editheight - 44 + "px"};
        }
    }
        @media only screen and (min-width: 500px) and (max-width:530px){
        .ql-container{
            height:70%;
        }
      }
      @media only screen and (min-width: 530px) and (max-width:830px){
        .ql-container{
            height:78%;
        }
      }
      @media only screen and (min-width: 830px) and (max-width:1366px){
        .ql-container{
            height:86%;
        }
      }
`;
export class TextControllerClassic extends Component {
    constructor(props) {
        super(props);
        this.onChangeText = this.onChangeText.bind(this);
    }
    onChangeText(content) {
        this.props.getValue({ content: content });
    }
    render() {
        const { item } = this.props;
        return (
            <React.Fragment>
                <EditorWrapper border={this.props.border} width={this.props.width} editheight={this.props.editheight} height={item.height} marginBottom={this.props.marginBottom}>
                    <div className="copyright">power by https://quilljs.com</div>
                    <Editor
                        value={this.props.item.content}
                        className="editor"
                        onChange={this.onChangeText}
                        theme="snow"
                        modules={{
                            toolbar: [
                                [{ 'font': [] }],
                                [{ 'size': ['small', false, 'large', 'huge'] }],
                                ['bold', 'italic', 'underline'],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                [{ 'align': [] }],
                                [{ 'color': [] }, { 'background': [] }],
                                ['clean']
                            ]
                        }}
                        formats={[
                            'font',
                            'size',
                            'bold', 'italic', 'underline',
                            'list', 'bullet',
                            'align',
                            'color', 'background'
                        ]}
                    />
                </EditorWrapper>

            </React.Fragment>
        );
    }
}
