import React, { Component } from "react";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import { FileUploadRequest } from "actions/Uploads";
import market_style from "market_style";

const Wrapper = styled.div`
    width:100%;
    margin-top:-5px;
    .row{
        height:31px;
        width:100%;
        display:flex;
        align-items:center;
    }
    .marginTop{
        margin-top:10px;
    }
    .caption{
        min-width:100%;
        color:red;
        font-size:${market_style.font.size.mini2};
        position:absolute;
        right:90px;
    }
    .relative{
        position:relative;
    }
    .absolute{
        position:absolute;
    }
`
const InputText = styled.input.attrs({ type: "text" })`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:31px;
  border-radius:10px;
  font-family:Noto Sans KR;
  font-size:${market_style.font.size.small1};
  background-color:#E9E9E9;
  outline:none;
  border:0px;
  padding: 0.67857143em 1em;
  font-weight:300;
`;
const UploadButton = styled.div`
    min-width: 130px;
    height: 31px;
    background: var(--unnamed-color-707070) 0% 0% no-repeat padding-box;
    background: #707070 0% 0% no-repeat padding-box;
    border-radius: 20px;
    opacity: 1;
    position:absolute;
    color:white;
    font-weight:500;
    display:flex;
    justify-content:center;
    align-items:center;
    right:0px;
`
export class InputFile_mini extends Component {

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
        this.returnData();
    }
    render() {
        return (
            <React.Fragment>
                <Wrapper>
                <div className="row">
                <InputText
                    disabled={true}
                    onChange={this.onChangeValue}
                    value={this.state.value}
                />
                 <input id="addfile" hidden type="file" name="source" ref={ref => (this.input = ref)} onChange={e => this.onFileChange(e.target.files)} accept={`.${this.props.accept}`} />
                 </div>
                 <div className="row marginTop">
                <div className="row relative">
                        {this.props.accept
                        ? <div className="caption"> * {this.props.accept}파일만 등록이 가능합니다. </div>
                        : null}

                        <UploadButton htmlFor="addfile">
                            <div className="text">파일 등록</div>
                        </UploadButton>
                </div>
                </div>
                </Wrapper>
            </React.Fragment>
        );
    }
}


{/* <Wrapper>
<div className="flexing-row">
    <FormStyle
        disabled={true}
        onChange={this.onChangeValue}
        value={this.state.value}
    />
    <input id="addfile" hidden type="file" name="source" ref={ref => (this.input = ref)} onChange={e => this.onFileChange(e.target.files)} accept={`.${this.props.accept}`} />
</div>

<div className="flex">
    {this.props.accept
    ? <Caution> * {this.props.accept}파일만 등록이 가능합니다. </Caution>
    : null}
    <UploadButton htmlFor="addfile">
            <div className="text">파일 등록</div>
    </UploadButton>
 </div>
</Wrapper> */}