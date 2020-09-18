import React, { Component } from 'react';
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from "styled-components";
import Editor from "react-quill";
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

const EditorWrapper = styled.div`
    margin-bottom: 5px;
    // .ck.ck-editor{
    //     width:${props => props.width == null ? "100%" : props.width + "px"};
        
    // }
    .copyright {
        width: max-content;
        margin-left: auto;
        font-size: 0.8rem;
    }
    // .ck-editor__editable {
    //     height:${props => props.editheight == null ? "100%" : props.editheight + "px"};
    // }
    // .ck-editor__editable_inline {

    //     min-width:400px;
    //     min-height: ${props => props.height || 70}px;
    // }
    .editor {
        width:${props => props.width == null ? "100%" : props.width + "px"};
        height:${props => props.editheight == null ? "100%" : props.editheight + "px"};
        // min-width:400px;
        // min-height: ${props => props.height || 70}px;
    }xxx
`;
export class TextControllerClassic extends Component {
    constructor(props){
        super(props);
        this.onChangeText = this.onChangeText.bind(this);
    }
    onChangeText(content){
        this.props.getValue({content:content});
    }
    render() {
        const { item } = this.props;
        return (
            <React.Fragment>
        <EditorWrapper width={this.props.width} editheight={this.props.editheight} height={item.height}>
            {/*<CKEditor

                id="classicEditor_"
                editor={ClassicEditor}
                data={item.content}
                onInit={editor => { editor.editing.view.focus(); }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    this.props.getValue({ content: data });
                }}
                onBlur={(event, editor) => { console.log('Blur.', event, editor); }}
                onFocus={(event, editor) => { console.log('Focus.', editor); }} />
            <p className="copyright">(editor: CKEditor 5 classic)</p> */}
            <Editor
                value={this.props.item.content}
                className="editor"
                onChange={this.onChangeText}
                // onChange={(content, delta, source, editor) => {
                //     this.props.getValue({ content: editor.getHTML() })
                // }}
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
           <div className="copyright">(quill에디터: https://quilljs.com)</div>
        </EditorWrapper>
         
         </React.Fragment>
        );
    }
}
