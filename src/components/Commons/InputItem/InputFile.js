import React, { Component } from "react";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import { FileUploadRequest } from "actions/Uploads";

const FormStyle = styled.input.attrs({type:"text"})`
    width: ${props => props.width}px;

    margin: 0;
    -webkit-appearance: none;
    padding: 0.67857143em 1em;
    height:52px;
    border-radius:26px;
    background-color:#efefef;
    outline:none;
    border:0px;
    text-align:center;
    color:#707070;
    font-size:17px;

    transition: color 0.1s ease, border-color 0.1s ease;
    &::placeholder {
        color: ${StyleGuide.color.geyScale.scale5};
        font-family:Noto Sans CJK KR, Regular;
        font-size:17px;
    }
    &:focus {
        &::placeholder {
            color: ${StyleGuide.color.geyScale.scale7};
        }
        border-color: #85b7d9;
        box-shadow: 0 0 0 0 rgba(34, 36, 38, 0.35) inset;
    }
    &.error {
        border: 1px solid ${StyleGuide.color.main.basic};
        color: ${StyleGuide.color.main.basic};
        &::placeholder {
            color: ${StyleGuide.color.main.basic};
        }
    }
`;
const Label = styled.label`
    height:52px;
    width:124px;
    border-radius:26px;
    border:1px solid #707070;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
    margin-left:18px;
    margin-right:20px;
    .text{
        font-size:17px;
        font-weight:500;
        color:#707070;
    }
`
const Tag=styled.div`
color:red;
font-size:17px;
font-weight:300;

`

const CheckedCharLength = text => {
    let str = text;
    let charLength = 0;
    let ch = "";
    for (let n = 0; n < str.length; n++) {
        ch = str.charAt(n);
        if (escape(ch).length > 4) {
            charLength += 2;
        }
        else {
            charLength += 1;
        }
    }
    return charLength;
};
export class InputFile extends Component {

    constructor(props) {
        super(props);
        this.state = { file:{file_url:"",filename:""},value:"선택된 파일 없음" };
        this.onFileChange=this.onFileChange.bind(this);
    }
    componentDidMount() {
        this.init();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.file !== this.props.file) {
            console.log("==============",this.props.file);
            this.setState({
                file:this.props.file,
                value:this.props.file.filename,
            })
        }
    }
    onFileChange = async event => {
        const file = event.currentTarget.files;
        console.log(file);
        const s3path = await FileUploadRequest(file);
    
        await this.setState({
          value:file[0].name,
          file:{file_url: s3path.path,
          filename: file[0].name}
        });
        console.log(s3path.path,file[0].name);
        await this.returnData();
      }
    returnData = async e => {
        this.props.getValue && await this.props.getValue(this.state.file);
    }
    init = async () => {
        // await this.setState({ tag: this.props.taglist || [] });
        this.returnData();
    }
    render() {
        return (
            <React.Fragment>

                <FormStyle
                    disabled={true}
                    width={this.props.width == null ? "100" : this.props.width}
                    onChange={this.onChangeValue}
                    value={this.state.value}
                />
                    <Label htmlFor="addfile"><div className="text">파일 등록</div></Label>
                    <input
                      id="addfile"
                      hidden
                      type="file"
                      name="source"
                      ref={ref => (this.input = ref)}
                      onChange={this.onFileChange}
                    //   accept=".pdf" 
                      />
                  <Tag>
                    * pdf파일만 등록이 가능합니다.
                </Tag>
            </React.Fragment>
        );
    }
}