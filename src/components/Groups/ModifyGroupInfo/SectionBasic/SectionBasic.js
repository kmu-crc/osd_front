import React, { Component } from "react";
import styled from "styled-components";
import noimg from "source/noimg.png"

const ContentsBox = styled.div`
    padding-left:47px;
    .title{
        width:100px;
        height:29px;
        text-align:left;
        font-size:20px;
        font-weight:500;
        line-height:29px;
        color:#707070;
    }
`
const ImageBox = styled.div`
    margin-left:67px;
    width:210px;
    height:210px;
    border-radius:10px;
    background: ${props => `url(${props.imageURL})`};
    background-size:cover;
    background-position:center center;
`
const ThumbnailBox = styled.div`
    display:flex;
    width:1200px;
    .explainBox{
        margin-left:54px;
        margin-top:100px;
    }
    .findThumbnailBtn{
        width:63px;
        height:25px;
        cursor:pointer;
    }
    .findThumbnailText{
        font-family:Noto Sans KR;
        font-size:17px;
        font-weight:500;
        text-align:left;
        line-height:25px;
        color:#FF0000;
        border-bottom:1.5px solid #FF000;
        cursor:pointer;
    }
    .findThumbnailBox{
        margin-left:54px;
        margin-top:100px;

    }
    .thumbnailExplainText{
        width:341px;
        height:45px;
        margin-top:11px;
        font-weight:300;
        font-size:14px;
        color:#707070;
        line-height:20px;
        text-align:left;
    }
`
const TitleBox = styled.div`
        width:1200px;
        display:flex;
        margin-top:96px;


        .inputText{
            width:505px;
            height:56px;
            margin-left:67px;
            padding-left:22px;
            padding-right:22px;
            font-size:20px;
            font-weight:300;
            font-family:Noto Sans KR;
            line-height:29px;
            color:#707070;
            border:none;
            border-radius:5px;
            outline:none;
            background-color:#EFEFEF;
        
        }
`
const ExplainBox = styled.div`

        width:1200px;
        margin-top:103px;
        display:flex;
        .inputTextareaBox{
            width:717.5px;
            height:244px;
            margin-left:70px;
            padding:22px 26px 34px 32px;
            font-family:Noto Sans KR;
            font-size:20px;
            font-weight:300;
            color:#707070;
            line-height:35px;
            text-align:left;
            outline:none;
            border:none;
            border-radius:5px;
            resize:none;
            background-color:#EFEFEF;
        }
`

// const BasicSecBox = {paddingLeft:"47px"}
// const BasicSecTitle={ width: "100px", height: "29px", lineHeight: "29px", fontSize: "20px", fontWeight: "500", color: "#707070", textAlign: "left" }
// const BasicSec_thumb_Box = { display: "flex",width:"1200px", }
// const BasicSec_thumb_ExplainBox={ marginLeft: "54.5px", marginTop: "100px"}
// const BasicSec_thumb_FindBox ={width: "63px", height: "25px", cursor: "pointer" }
// const BasicSec_thumb_FindTitle = {cursor: "pointer",fontWeight: "500", fontSize: "17px", borderBottom: "1.5px solid #FF0000", lineHeight: "25px", textAlign: "left", color: "#FF0000" }
// const BasicSec_thumb_FindExplain ={ width: "341px", height: "45px", marginTop: "11px", fontWeight: "300", fontSize: "14px", lineHeight: "20px", textAlign: "left", color: "#707070" }
// const BasicSec_title_Box ={ marginTop: "96px", width: "1200px",display:"flex" }
// const BasicSec_title_InputBox = { marginLeft: "67px", width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }
// const BasicSec_title_Input ={ outline: "none", marginLeft: "27px", marginTop: "12px", height: "29px", lineHeight: "29px", width: "451.5px", border: "none", color: "#707070", backgroundColor: "#EFEFEF" }
// const BasicSec_explain_Box ={ marginTop: "103px", display: "flex",width:"1200px" }
// const BasicSec_explain_InputBox ={ width: "717.5px", height: "244px", marginLeft: "70px", backgroundColor: "#EFEFEF", borderRadius: "5px",}
// const BasicSec_explain_Input ={  width: "717.5px", height: "244px", backgroundColor: "#EFEFEF", outline: "none", border: "none", 
// resize: "none", lineHeight: "35px",  textAlign: "left", fontSize: "20px", fontWeight: "300", color: "#707070", paddingTop: "26px", paddingLeft: "22px", 
// paddingBottom: "34px", paddingRight: "32.5px"}
const GroupImageText = "그룹 이미지";
class GroupBasicInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { groupTitle: "", groupExplain: "", groupThumbnail: noimg, groupThumbnailURL: "", groupThumbnailName: "" }
        this.handleOnChangeTitle = this.handleOnChangeTitle.bind(this);
        this.handleOnChangeExplain = this.handleOnChangeExplain.bind(this);
        this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
        this.onKeyDownEnter = this.onKeyDownEnter.bind(this);
    }
    shouldComponentUpdate(nextProps) {
        // if(this.props.DesignDetail.title!=nextProps.DesignDetail.title) this.props.onChangeTitle(nextProps.DesignDetail.title);
        // if(this.props.DesignDetail.explanation!=nextProps.DesignDetail.explanation) this.setState({explain:nextProps.DesignDetail.explanation})
        // if(this.props.DesignDetail.img!=nextProps.DesignDetail.img) this.setState({thumbnail:nextProps.DesignDetail.img.m_img})
        return true;
    }
    componentDidMount() {
        this.setState({
            groupTitle: this.props.groupTitle,
            groupExplain: this.props.groupExplain,
            groupThumbnail: this.props.groupThumbnail
        })
    }
    handleOnChangeTitle(event) {
        this.setState({ groupTitle: event.target.value });
        this.props.onChangeTitle(event.target.value);
    }
    handleOnChangeExplain(event) {
        this.setState({ groupExplain: event.target.value });
        this.props.onChangeExplain(event.target.value);
    }

    handleOnChangeThumbnail(event) {
        // const readUploadedFileAsText = inputFile => {
        //     const temporaryFileReader = new FileReader();

        //     return new Promise((resolve, reject) => {
        //       temporaryFileReader.onerror = () => {
        //         temporaryFileReader.abort();
        //         reject(new DOMException("Problem parsing input file."));
        //       };

        //       temporaryFileReader.onload = () => {
        //         resolve(temporaryFileReader.result);
        //       };
        //       temporaryFileReader.readAsDataURL(inputFile);
        //       this.setState({groupThumbnail:temporaryFileReader.result,groupThumbnailName:inputFile.name});
        //       this.props.onChangeThumbnail(temporaryFileReader.result,inputFile.name);
        //     });
        //   };
        //   const imgURL = readUploadedFileAsText(event.target.files[0]);
        //   this.setState({groupThumbnailURL:imgURL});
        //   this.props.onChangeThumbnailURL(imgURL);
        event.preventDefault();
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onloadend = () => {
            this.setState({ groupThumbnail: reader.result, groupThumbnailName: file.name })
            this.props.onChangeThumbnail(reader.result, file.name);
        }
        if (event.target.files[0]) {
            let imgurl = reader.readAsDataURL(file)
            this.setState({ groupThumbnailURL: imgurl });
            this.props.onChangeThumbnail(imgurl);
            console.log("file===", imgurl);

        }

    }
    onKeyDownEnter(event){
        if(event.key=="Enter")
        {
          document.getElementById("explainBox").focus();
        }
    
      }
    render() {
        console.log("THUMBNAIL", this.props);
        //const thumbnaileURL = this.props.DesignDetail.img && this.props.designThumbnail;
        return (
            <ContentsBox>
                {/* thumbnail */}
                <ThumbnailBox>
                    <div className="title">{GroupImageText}<sup>*</sup></div>
                    <ImageBox imageURL={this.props.groupThumbnail} ></ImageBox>
                    <div className="findThumbnailBox">
                        <div className="findThumbnailBtn">
                            <label for="file" className="findThumbnailText" onClick={this.handleFileUploadModal}>찾아보기</label>
                            <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" value={null} />
                        </div>
                    <div className="thumbnailExplainText">{GroupImageText}는 대표적으로 보이게 되는 사진으로, <br />JPG/JPEG/PNG/BMP 파일을 등록 가능합니다.</div>
                    </div>
                </ThumbnailBox>
                {/* title */}
                <TitleBox>
                    <div className="title">제목<sup>*</sup></div>
                    <input type="text" onKeyDown={this.onKeyDownEnter} className="inputText" onChange={this.handleOnChangeTitle} value={this.props.groupTitle} />
                </TitleBox>
                {/* description */}
                <ExplainBox>
                    <div className="title">설명</div>
                    <textarea id="explainBox" className="inputTextareaBox" placeholder="디자인에 대한 설명을 입력하세요." onChange={this.handleOnChangeExplain} value={this.props.groupExplain} />
                </ExplainBox>
            </ContentsBox>

        );
    }
}
export default GroupBasicInfo;