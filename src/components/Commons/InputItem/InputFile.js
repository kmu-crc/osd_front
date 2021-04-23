import React, { Component } from "react";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import { FileUploadRequest } from "actions/Uploads";
import market_style from "market_style";

const Wrapper = styled.div`
    .flexing-row {
        display: flex;
        flex-direction: row;
    }
`;
const FormStyle = styled.input.attrs({ type: "text" })`
    // width: ${props => props.width}px;
    // margin: 0;
    // height:52px;
    // border-radius:26px;
    // background-color:#efefef;
    // border:0px;
    // text-align:center;
    // color:#707070;
    // font-size:${market_style.font.size.small3};
    
    width: ${props => props.width ? props.width : 372}px;
    height: 31px;
    background: #E9E9E9 0% 0% no-repeat padding-box;
    border-radius: 10px;
    opacity: 1;
    border: none;
    outline:none;
    margin-bottom:5px;
    -webkit-appearance: none;
    margin-right: 10px;
    padding: 6px 0px 0px 11px;

    transition: color 0.1s ease, border-color 0.1s ease;
    &::placeholder {
        text-align: left;
        font: normal normal 300 13px/19px Noto Sans KR;
        letter-spacing: 0px;
        color: #707070;
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
const UploadButton = styled.label`

    width: 100px;
    height: 31px;
    border: 1px solid #707070;
    border-radius: 16px;
    
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;

    .text {

        height: 22px;
        text-align: center;
        font: normal normal medium 15px/22px Noto Sans KR;
        letter-spacing: 0px;
        color: #707070;
    }
    // height:52px;
    // width:124px;
    // border-radius:26px;
    // border:1px solid #707070;
    // margin-left:18px;
    // margin-right:20px;
    // .text{
    //     font-size:${market_style.font.size.small3};
    //     font-weight:500;
    //     color:#707070;
    // }
`
const Caution = styled.div`
    margin-top: 10px;
    text-align: left;
    font: normal normal normal 13px/19px Noto Sans KR;
    letter-spacing: 0px;
    color: #FF0000;
    // color:red;
    // font-size:${market_style.font.size.small3};
    // font-weight:300;
`

// const CheckedCharLength = text => {
//     let str = text;
//     let charLength = 0;
//     let ch = "";
//     for (let n = 0; n < str.length; n++) {
//         ch = str.charAt(n);
//         if (escape(ch).length > 4) {
//             charLength += 2;
//         }
//         else {
//             charLength += 1;
//         }
//     }
//     return charLength;
// };
export class InputFile extends Component {

    constructor(props) {
        super(props);
        this.state = { file: { file_url: "", filename: "" }, value: "선택된 파일 없음" };
        this.onFileChange = this.onFileChange.bind(this);
    }
    componentDidMount() {
        this.init();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.file !== this.props.file) {
            // console.log("==============",this.props.file);
            this.setState({
                file: this.props.file,
                value: this.props.file.filename,
            })
        }
    }
    onFileChange = async files => {
        await this.setState({ value: "파일을 등록하고 있는 중입니다." });
        const file = files;
        const s3path = await FileUploadRequest(file);

        await this.setState({
            value: file[0].name,
            file: {
                file_url: s3path.path,
                filename: file[0].name
            }
        });
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
            <Wrapper>
                <div className="flexing-row">
                    <FormStyle
                        disabled={true}
                        width={this.props.width == null ? "100" : this.props.width}
                        onChange={this.onChangeValue}
                        value={this.state.value}
                    />
                    {/* hidden file input */}
                    <input id="addfile" hidden type="file" name="source" ref={ref => (this.input = ref)} onChange={e => this.onFileChange(e.target.files)} accept={`.${this.props.accept}`} />

                    <UploadButton htmlFor="addfile">
                        <div className="text">파일 등록</div>
                    </UploadButton>
                </div>

                {this.props.accept
                    ? <Caution> * {this.props.accept}파일만 등록이 가능합니다. </Caution>
                    : null}

            </Wrapper>
        );
    }
}