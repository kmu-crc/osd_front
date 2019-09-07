import React, { Component } from "react";
import noimg from "source/noimg.png"

const BasicSecBox = {paddingLeft:"47px"}
const BasicSecTitle={ width: "100px", height: "29px", lineHeight: "29px", fontSize: "20px", fontWeight: "500", color: "#707070", textAlign: "left" }
const BasicSec_thumb_Box = { display: "flex",width:"1200px", }
const BasicSec_thumb_ExplainBox={ marginLeft: "54.5px", marginTop: "100px"}
const BasicSec_thumb_FindBox ={width: "63px", height: "25px", cursor: "pointer" }
const BasicSec_thumb_FindTitle = {cursor: "pointer",fontWeight: "500", fontSize: "17px", borderBottom: "1.5px solid #FF0000", lineHeight: "25px", textAlign: "left", color: "#FF0000" }
const BasicSec_thumb_FindExplain ={ width: "341px", height: "45px", marginTop: "11px", fontWeight: "300", fontSize: "14px", lineHeight: "20px", textAlign: "left", color: "#707070" }
const BasicSec_title_Box ={ marginTop: "96px", width: "1200px",display:"flex" }
const BasicSec_title_InputBox = { marginLeft: "67px", width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }
const BasicSec_title_Input ={ outline: "none", marginLeft: "27px", marginTop: "12px", height: "29px", lineHeight: "29px", width: "451.5px", border: "none", color: "#707070", backgroundColor: "#EFEFEF" }
const BasicSec_explain_Box ={ marginTop: "103px", display: "flex",width:"1200px" }
const BasicSec_explain_InputBox ={ width: "717.5px", height: "244px", marginLeft: "70px", backgroundColor: "#EFEFEF", borderRadius: "5px",}
const BasicSec_explain_Input ={  width: "717.5px", height: "244px", backgroundColor: "#EFEFEF", outline: "none", border: "none", 
                                resize: "none", lineHeight: "35px",  textAlign: "left", fontSize: "20px", fontWeight: "300", color: "#707070", paddingTop: "26px", paddingLeft: "22px", 
                                paddingBottom: "34px", paddingRight: "32.5px"}


class GroupBasicInfo extends Component
{
    constructor(props)
    {
        super(props);
        this.state={groupTitle:"",groupExplain:"",groupThumbnail:noimg,groupThumbnailURL:"",groupThumbnailName:""}
        this.handleOnChangeTitle=this.handleOnChangeTitle.bind(this);
        this.handleOnChangeExplain = this.handleOnChangeExplain.bind(this);
        this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
    }
    shouldComponentUpdate(nextProps)
    {
        // if(this.props.DesignDetail.title!=nextProps.DesignDetail.title) this.props.onChangeTitle(nextProps.DesignDetail.title);
        // if(this.props.DesignDetail.explanation!=nextProps.DesignDetail.explanation) this.setState({explain:nextProps.DesignDetail.explanation})
        // if(this.props.DesignDetail.img!=nextProps.DesignDetail.img) this.setState({thumbnail:nextProps.DesignDetail.img.m_img})
        return true;
    }
    componentDidMount()
    {
        this.setState({
            groupTitle:this.props.groupTitle,
            groupExplain:this.props.groupExplain,
            groupThumbnail:this.props.groupThumbnail
        })
    }
    handleOnChangeTitle(event)
    {
        this.setState({groupTitle:event.target.value});
        this.props.onChangeTitle (event.target.value);
    }
    handleOnChangeExplain(event)
    {
        this.setState({groupExplain:event.target.value});
        this.props.onChangeExplain (event.target.value);
    }

    handleOnChangeThumbnail(event)
    {
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
        const file =event.target.files[0];
        reader.onloadend = ()=>{
            this.setState({groupThumbnail:reader.result,groupThumbnailName:file.name})
            this.props.onChangeThumbnail(reader.result,file.name);
        }
        if(event.target.files[0])
        {
            let imgurl =  reader.readAsDataURL(file)
            this.setState({groupThumbnailURL:imgurl});
            this.props.onChangeThumbnail(imgurl);
            console.log("file===",imgurl);
              
        }

    }

    render()
    {
        console.log("THUMBNAIL",this.props);
        //const thumbnaileURL = this.props.DesignDetail.img && this.props.designThumbnail;
        return(
            <section style={BasicSecBox} >
            {/* thumbnail */}
                <div style={BasicSec_thumb_Box}>
                    <div style={BasicSecTitle}>섬네일 사진
                    {/* <input hidden type="file" value={null} /> */}
                    </div>
                    <div style={{marginLeft: "67px", width: "210px", height: "210px", borderRadius: "10px", 
                    backgroundImage: `url(${this.state.groupThumbnail})`,backgroundSize: "cover", backgroundPosition: "center center"}} ></div>
                    <div style={BasicSec_thumb_ExplainBox}>
                    <div style={BasicSec_thumb_FindBox}>
                        <label for="file" onClick = {this.handleFileUploadModal}style={BasicSec_thumb_FindTitle}>찾아보기</label>
                        <input hidden onChange = {this.handleOnChangeThumbnail} id="file" type="file" value ={null} />
                    </div>
                    <div style={BasicSec_thumb_FindExplain}>프로필 사진은 대표적으로 보이게 되는 사진으로, JPG/<br />JPEG/PNG 파일을 등록 가능합니다.</div>
                    </div>
                </div>
                {/* title */}
                <div style={BasicSec_title_Box}>
                    <div style={BasicSecTitle}>제목</div>
                    <div style={BasicSec_title_InputBox} >
                    <input type="text" style={BasicSec_title_Input} onChange = {this.handleOnChangeTitle} value = {this.state.groupTitle}/>
                    </div>
                </div>
                {/* description */}
                <div style={BasicSec_explain_Box}>
                <div style={BasicSecTitle}>그룹 설명</div>
                <div style={BasicSec_explain_InputBox}>
                    <textarea style={BasicSec_explain_Input} placeholder="디자인에 대한 설명을 입력하세요." onChange = {this.handleOnChangeExplain} value={this.props.groupExplain}/>
                </div>
                </div>
            </section>

        );
    }
}
export default GroupBasicInfo;